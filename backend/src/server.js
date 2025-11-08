import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import shippingRoutes from './routes/shipping.js';
import { initializeDatabase } from './utils/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

await initializeDatabase();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.resolve(process.cwd(), 'backend', 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/shipping', shippingRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'ChicDZ API opérationnelle' });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Erreur interne du serveur' });
});

app.listen(PORT, () => {
  console.log(`ChicDZ API running on port ${PORT}`);
});
