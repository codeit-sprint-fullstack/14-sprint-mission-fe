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
  await prisma.Product.deleteMany();
  await prisma.Tags.deleteMany();
  await prisma.Article.deleteMany();

  await prisma.Product.createMany({ data: PRODUCTS, skipDuplicates: true});
  await prisma.Article.createMany({ data: ARTICLES, skipDuplicates: true});
  
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