import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// 접속 문자열은 .env 의 DATABASE_URL 한 곳에서만 온다 (schema.prisma 에는 값 없음).
// seed.js / prisma.config.ts 와 동일하게 driver adapter 로 연결한다.
const createPrismaClient = () => {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
};

// Next.js dev 환경의 HMR 로 인해 매 요청마다 클라이언트가 새로 생기는 것을 막기 위해
// globalThis 에 캐싱한다. 프로덕션에서는 매 인스턴스당 1개만 생성.
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
