import 'dotenv/config';
import pkg from "@prisma/client"
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import mook from './mook.js';

const { PRODUCTS, ARTICLES } = mook;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {

  await prisma.User.deleteMany();
  await prisma.ProductComment.deleteMany();
  await prisma.Product.deleteMany();
  await prisma.Tags.deleteMany();
  await prisma.ArticleComment.deleteMany();
  await prisma.Article.deleteMany();
  

  await prisma.Product.createMany({ data: PRODUCTS, skipDuplicates: true});
  await prisma.Article.createMany({ data: ARTICLES, skipDuplicates: true});
  

  // Article, Product id 조회 후 Comment 자동 생성 
  const articles = await prisma.article.findMany();
  const products = await prisma.product.findMany();

  await prisma.ArticleComment.createMany({
    data: articles
      .map((article) => [
        { content: `${article.title}에 대한 첫 번째 댓글`, articleId: article.id },
        { content: `${article.title}에 대한 두 번째 댓글`, articleId: article.id },
      ])
      .flat(),
  });

  await prisma.ProductComment.createMany({
    data: products
      .map((product) => [
        { content: `${product.title}에 대한 첫 번째 댓글`, productId: product.id },
        { content: `${product.title}에 대한 두 번째 댓글`, productId: product.id },
      ])
      .flat(),
  });
  // (테스트용이며 나중에 지워야함)
  
}

main()
  .then(async() => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });