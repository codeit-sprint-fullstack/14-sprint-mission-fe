import { Prisma } from '@prisma/client'
import prisma from '../lib/prisma.js'

export async function getProducts(query = {}) {
  const { offset = 0, limit = 10, sort = 'recent', keyword = '' } = query

  let orderBy

  switch (sort) {
    case 'oldest':
      orderBy = { createdAt: 'asc' }
      break
    case 'recent':
    default:
      orderBy = { createdAt: 'desc' }
  }

  return await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: keyword, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } }
      ]
    },
    select: {
      id: true,
      name: true,
      price: true,
      createdAt: true
    },
    orderBy,
    skip: parseInt(offset),
    take: parseInt(limit)
  })
}

export async function getProduct(productId) {
  return await prisma.product.findUniqueOrThrow({
    where: { id: productId },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      createdAt: true
    }
  })
}

export async function createProduct(data) {
  return await prisma.product.create({
    data
  })
}

export async function patchProduct(productId, data) {
  return await prisma.product.update({
    where: { id: productId },
    data: {
      name: data.name ?? Prisma.skip,
      description: data.description ?? Prisma.skip,
      price: data.price ?? Prisma.skip,
      tags: data.tags ?? Prisma.skip
    }
  })
}

export async function deleteProduct(productId) {
  return await prisma.product.delete({
    where: { id: productId }
  })
}