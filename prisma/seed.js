import 'dotenv/config'
import process from 'node:process'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

import { ARTICLES, PRODUCTS } from './mock.js'

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
})

async function main() {
  await prisma.articleComment.deleteMany()
  await prisma.article.deleteMany()
  await prisma.product.deleteMany()

  await prisma.product.createMany({
    data: PRODUCTS,
  })
  for (const article of ARTICLES) {
    await prisma.article.create({
      data: {
        title: article.title,
        content: article.content,
        comments: {
          create: article.comments.map((content) => ({ content })),
        },
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
