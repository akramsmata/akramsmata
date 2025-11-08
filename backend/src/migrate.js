import { initializeDatabase } from './utils/db.js';

initializeDatabase()
  .then(() => {
    console.log('Database ready.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed', error);
    process.exit(1);
  });
