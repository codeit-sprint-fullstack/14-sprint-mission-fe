import 'server-only';
import pg from 'pg';

const { Pool } = pg;

function resolveSslConfig() {
  if (process.env.DATABASE_SSL === 'true' || process.env.PGSSLMODE === 'require') {
    return { rejectUnauthorized: false };
  }

  return false;
}

const globalForDatabase = globalThis;

export const pool = globalForDatabase.__pandaMarketPool || new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: resolveSslConfig(),
});

if (process.env.NODE_ENV !== 'production') {
  globalForDatabase.__pandaMarketPool = pool;
}

export function query(text, params) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL 환경 변수가 설정되지 않았습니다.');
  }

  return pool.query(text, params);
}
