require('dotenv').config();

const { pool } = require('../db/pool');

const mask = (value = '') => {
  if (!value) return '(empty)';
  if (value.length <= 4) return '****';
  return `${value.slice(0, 2)}****${value.slice(-2)}`;
};

const printConfig = () => {
  const usingUrl = Boolean(process.env.DATABASE_URL);
  if (usingUrl) {
    console.log('[db-doctor] DATABASE_URL mode');
    console.log(`[db-doctor] DATABASE_URL=${mask(process.env.DATABASE_URL)}`);
    console.log(`[db-doctor] PGSSLMODE=${process.env.PGSSLMODE || '(not set)'}`);
    return;
  }

  console.log('[db-doctor] discrete PG* mode');
  console.log(`[db-doctor] PGHOST=${process.env.PGHOST || '127.0.0.1'}`);
  console.log(`[db-doctor] PGPORT=${process.env.PGPORT || '5432'}`);
  console.log(`[db-doctor] PGDATABASE=${process.env.PGDATABASE || 'k_meal_bridge'}`);
  console.log(`[db-doctor] PGUSER=${process.env.PGUSER || 'postgres'}`);
};

const run = async () => {
  printConfig();

  try {
    const now = await pool.query('SELECT NOW() AS now');
    console.log(`[db-doctor] OK: connected to PostgreSQL at ${now.rows[0].now}`);
    process.exitCode = 0;
  } catch (error) {
    console.error(`[db-doctor] FAIL: ${error.message}`);
    console.error('[db-doctor] Next steps:');
    console.error('  1) Ensure PostgreSQL server is running');
    console.error('  2) Verify backend/.env connection values');
    console.error('  3) Run: npm --prefix backend run db:doctor');
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

run();
