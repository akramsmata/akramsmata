import express from 'express';
import { body, validationResult } from 'express-validator';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { createConnection } from '../utils/db.js';
import { slugify } from '../utils/slug.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

const uploadDir = path.resolve(process.cwd(), 'backend', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  }
});

const upload = multer({ storage });

const productValidators = [
  body('name').isLength({ min: 3 }).withMessage('Le nom doit contenir au moins 3 caractères'),
  body('price').isFloat({ min: 0 }).withMessage('Le prix doit être positif'),
  body('description').optional().isLength({ max: 2000 }).withMessage('Description trop longue'),
  body('colors').optional().isArray().withMessage('Couleurs doit être une liste'),
  body('sizes').optional().isArray().withMessage('Tailles doit être une liste'),
  body('stockStatus').optional().isIn(['available', 'low-stock', 'sold-out']).withMessage('Statut invalide'),
  body('featured').optional().isBoolean().withMessage('Featured doit être booléen')
];

router.get('/', async (_req, res) => {
  const db = await createConnection();
  const rows = await db.all('SELECT * FROM products ORDER BY createdAt DESC');
  await db.close();
  res.json(
    rows.map((row) => ({
      ...row,
      colors: row.colors ? JSON.parse(row.colors) : [],
      sizes: row.sizes ? JSON.parse(row.sizes) : []
    }))
  );
});

router.get('/:slug', async (req, res) => {
  const db = await createConnection();
  const row = await db.get('SELECT * FROM products WHERE slug = ?', req.params.slug);
  await db.close();
  if (!row) {
    return res.status(404).json({ message: 'Produit introuvable' });
  }
  res.json({
    ...row,
    colors: row.colors ? JSON.parse(row.colors) : [],
    sizes: row.sizes ? JSON.parse(row.sizes) : []
  });
});

router.post('/', authenticate, upload.single('image'), productValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ errors: errors.array() });
  }

  const db = await createConnection();
  const { name, price, description, stockStatus, featured } = req.body;
  const colors = req.body.colors ? JSON.parse(req.body.colors) : [];
  const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];
  const slug = slugify(name);
  const imageUrl = req.file ? `/uploads/${path.basename(req.file.path)}` : req.body.imageUrl || null;

  try {
    const now = new Date().toISOString();
    await db.run(
      `INSERT INTO products (name, slug, description, price, imageUrl, colors, sizes, stockStatus, featured, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        slug,
        description || '',
        parseFloat(price),
        imageUrl,
        JSON.stringify(colors),
        JSON.stringify(sizes),
        stockStatus || 'available',
        featured === 'true' || featured === true ? 1 : 0,
        now,
        now
      ]
    );
    const created = await db.get('SELECT * FROM products WHERE slug = ?', slug);
    res.status(201).json({
      ...created,
      colors,
      sizes
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ message: 'Un produit avec ce nom existe déjà' });
    }
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du produit' });
  } finally {
    await db.close();
  }
});

router.put('/:id', authenticate, upload.single('image'), productValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ errors: errors.array() });
  }

  const db = await createConnection();
  const { name, price, description, stockStatus, featured } = req.body;
  const colors = req.body.colors ? JSON.parse(req.body.colors) : [];
  const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];
  const slug = slugify(name);
  const imageUrl = req.file ? `/uploads/${path.basename(req.file.path)}` : req.body.imageUrl || null;
  const now = new Date().toISOString();

  try {
    const existing = await db.get('SELECT * FROM products WHERE id = ?', req.params.id);
    if (!existing) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ message: 'Produit introuvable' });
    }

    await db.run(
      `UPDATE products SET name = ?, slug = ?, description = ?, price = ?, imageUrl = ?, colors = ?, sizes = ?, stockStatus = ?, featured = ?, updatedAt = ? WHERE id = ?`,
      [
        name,
        slug,
        description || '',
        parseFloat(price),
        imageUrl || existing.imageUrl,
        JSON.stringify(colors),
        JSON.stringify(sizes),
        stockStatus || 'available',
        featured === 'true' || featured === true ? 1 : 0,
        now,
        req.params.id
      ]
    );

    const updated = await db.get('SELECT * FROM products WHERE id = ?', req.params.id);
    res.json({
      ...updated,
      colors,
      sizes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du produit' });
  } finally {
    await db.close();
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  const db = await createConnection();
  try {
    const existing = await db.get('SELECT * FROM products WHERE id = ?', req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Produit introuvable' });
    }

    await db.run('DELETE FROM products WHERE id = ?', req.params.id);

    if (existing.imageUrl && existing.imageUrl.startsWith('/uploads/')) {
      const filePath = path.join(uploadDir, path.basename(existing.imageUrl));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({ message: 'Produit supprimé' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du produit' });
  } finally {
    await db.close();
  }
});

export default router;
