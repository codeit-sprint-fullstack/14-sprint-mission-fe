import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

import { ARTICLES, ITEMS } from './mock.js';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.marketComment.deleteMany();
  await prisma.item.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.articleComment.deleteMany();
  await prisma.article.deleteMany();
  
//item seeding
 const items = [];
  for ( const item of ITEMS ) {
  const { tags, ...itemFields } = item;
  const createdItem = await prisma.item.create({
        data: {
          ...itemFields,
          tags: { 
            connectOrCreate: tags.map((tag) => ({ 
              where: { tagName: tag },
              create: { tagName: tag },
            }))
          },
        },
        include: { tags: true },
      });
    items.push(createdItem)
}
  
  // console.log(JSON.stringify(items, null, 2));

  //article seeding
  await Promise.all(
    ARTICLES.map(async (article) => (
      await prisma.article.create({
        data: article,
      })
    ))
  )
};



main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
