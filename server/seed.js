import prisma from './lib/prisma.js'
import { productData } from './data/seedData.js'

async function main() {
  await prisma.product.deleteMany()

  await prisma.product.createMany({
    data: productData,
  })

  console.log('Seed data inserted successfully.')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
