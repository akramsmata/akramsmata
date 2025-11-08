import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

const router = express.Router();

const credentials = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD
};

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Mot de passe trop court')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    if (email !== credentials.email) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    if (password !== credentials.password) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ token, email });
  }
);

export default router;
