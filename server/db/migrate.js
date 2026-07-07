import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { pool } from '../config/db.js';

const currentDir = dirname(fileURLToPath(import.meta.url));

async function migrate() {
  const schemaSql = await readFile(join(currentDir, 'schema.sql'), 'utf8');
  await pool.query(schemaSql);
  await pool.end();
  console.log('Migration completed');
}

migrate().catch(async (error) => {
  console.error(error);
  await pool.end();
  process.exit(1);
});
