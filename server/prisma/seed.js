import 'dotenv/config';
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaPg } from "@prisma/adapter-pg";
import { PRODUCTS, ARTICLES, PRODUCT_COMMENTS, ARTICLE_COMMENTS } from './mock.js';

//PostgreSQL 연결 및 Prisma Client 생성
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 기존 데이터 삭제
  // 자식(댓글들) -> 부모(product,article) 순으로 삭제
  await prisma.productComment.deleteMany();
  await prisma.articleComment.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();

  // 목 데이터 삽입
  // 부모(product,article) -> 자식(댓글들) 순으로 생성
  await prisma.product.createMany({ data: PRODUCTS, skipDuplicates: true });
  await prisma.article.createMany({ data: ARTICLES, skipDuplicates: true });
  await prisma.productComment.createMany({ data: PRODUCT_COMMENTS, skipDuplicates: true });
  await prisma.articleComment.createMany({ data: ARTICLE_COMMENTS, skipDuplicates: true });


}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });