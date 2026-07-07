import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { PRODUCTS, ARTICLES, PRODUCT_COMMENTS, ARTICLE_COMMENTS } from './mock.js'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.comment.deleteMany()
  await prisma.product.deleteMany()
  await prisma.article.deleteMany()

  await prisma.product.createMany({
    data: PRODUCTS, 
    skipDuplicates: true
  })
  await prisma.article.createMany({
    data: ARTICLES,
    skipDuplicates: true
  })
  await Promise.all(
    PRODUCT_COMMENTS.map(async (product_comment) => {
      await prisma.comment.create({ data: product_comment })
    })
  )
  await Promise.all(
    ARTICLE_COMMENTS.map(async (article_comment) => {
      await prisma.comment.create({ data: article_comment })
    })
  )
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