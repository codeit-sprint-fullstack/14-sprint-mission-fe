import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { PRODUCTS, ARTICLES } from './mock.js'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
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