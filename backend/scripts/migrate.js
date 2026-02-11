const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { pool } = require('../db/pool');

const migrationsDir = path.resolve(__dirname, '../../database/migrations');

const stripUtf8Bom = (text) => text.replace(/^\uFEFF/, '');

const run = async () => {
  const files = fs
    .readdirSync(migrationsDir)
    .filter((name) => name.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const raw = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    const sql = stripUtf8Bom(raw);
    if (!sql.trim()) continue;
    try {
      await pool.query(sql);
      console.log(`Applied migration: ${file}`);
    } catch (error) {
      const position = Number(error.position || 0);
      const context =
        position > 0
          ? sql.slice(Math.max(0, position - 30), Math.min(sql.length, position + 30))
          : '';

      console.error(`Migration failed in file: ${file}`);
      if (position) {
        console.error(`Error position: ${position}`);
        console.error(`Context: ${context.replace(/\s+/g, ' ')}`);
      }
      throw error;
    }
  }
};

run()
  .then(() => {
    console.log('Database migrations complete.');
    return pool.end();
  })
  .catch((error) => {
    console.error('Migration failed:', error.message);
    pool.end().finally(() => process.exit(1));
  });
