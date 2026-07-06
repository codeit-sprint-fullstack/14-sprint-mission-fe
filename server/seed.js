import prisma from './lib/prisma.js'
import { productData, articleData, commentData } from './data/seedData.js'

async function main() {
  await prisma.comment.deleteMany()
  await prisma.article.deleteMany()
  await prisma.product.deleteMany()

  await prisma.product.createMany({
    data: productData,
  })

  await prisma.article.createMany({
    data: articleData,
  })

  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'asc' },
  })

  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'asc' },
  })

  await prisma.comment.createMany({
    data: commentData.map((comment) => {
      if (comment.type === 'product') {
        return {
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          productId: products[comment.targetIndex].id,
        }
      }

      return {
        content: comment.content,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        articleId: articles[comment.targetIndex].id,
      }
    }),
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
