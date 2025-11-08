import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const dataPath = path.resolve(process.cwd(), 'backend', 'data', 'yalidine_rates.json');

router.get('/', (_req, res) => {
  const content = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(content);
  res.json(data);
});

export default router;
