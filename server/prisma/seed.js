import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PRODUCTS,
  ARTICLES,
  PRODUCT_COMMENT_CONTENTS,
  ARTICLE_COMMENT_CONTENTS,
} from "./mock.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.comment.deleteMany();
  await prisma.article.deleteMany();
  await prisma.product.deleteMany();

  const products = [];

  for (const productData of PRODUCTS) {
    const product = await prisma.product.create({
      data: productData,
    });

    products.push(product);
  }

  const articles = [];

  for (const articleData of ARTICLES) {
    const article = await prisma.article.create({
      data: articleData,
    });

    articles.push(article);
  }

  for (let i = 0; i < PRODUCT_COMMENT_CONTENTS.length; i++) {
    const product = products[i % products.length];

    await prisma.comment.create({
      data: {
        content: PRODUCT_COMMENT_CONTENTS[i],
        productId: product.id,
      },
    });
  }

  for (let i = 0; i < ARTICLE_COMMENT_CONTENTS.length; i++) {
    const article = articles[i % articles.length];

    await prisma.comment.create({
      data: {
        content: ARTICLE_COMMENT_CONTENTS[i],
        articleId: article.id,
      },
    });
  }

  console.log("Seed data created successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
