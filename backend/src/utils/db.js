import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'backend', 'data', 'store.sqlite');

export async function createConnection() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });
  return db;
}

export async function initializeDatabase() {
  const db = await createConnection();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      price REAL NOT NULL,
      imageUrl TEXT,
      colors TEXT,
      sizes TEXT,
      stockStatus TEXT DEFAULT 'available',
      featured INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await db.close();
}
