import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// PostgreSQL 연결 주소 확인
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL 환경변수가 설정되지 않았습니다.");
}

// PostgreSQL 드라이버 어댑터 생성
const adapter = new PrismaPg({
  connectionString,
});

// 개발 중 Prisma Client 중복 생성을 막기 위한 전역 객체 사용
const globalForPrisma = globalThis;

// 기존 Client가 있으면 재사용하고, 없으면 새로 생성
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

// 개발 환경에서는 생성한 Client를 전역 객체에 저장
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;