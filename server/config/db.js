import pg from 'pg';

const { Pool } = pg;

function resolveSslConfig() {
  if (process.env.DATABASE_SSL === 'true' || process.env.PGSSLMODE === 'require') {
    return { rejectUnauthorized: false };
  }

  return false;
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.DATABASE_URI,
  ssl: resolveSslConfig(),
});

export function query(text, params) {
  return pool.query(text, params);
}

async function connectDatabase() {
  if (!process.env.DATABASE_URL && !process.env.DATABASE_URI) {
    throw new Error('DATABASE_URL 또는 DATABASE_URI 환경 변수가 설정되지 않았습니다.');
  }

  await pool.query('SELECT 1');
  console.log('PostgreSQL connected');
}

export default connectDatabase;
