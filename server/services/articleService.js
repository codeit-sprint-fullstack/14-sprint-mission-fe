import { Prisma } from '@prisma/client'
import prisma from '../lib/prisma.js'

export async function getArticles(query = {}) {
  const { limit = 3, offset = 0, sort = 'recent', keyword = ''} = query

  let orderBy

  switch (sort) {
    case 'oldest':
      orderBy = { createdAt: 'asc'}
      break;
    case 'recent':
    default:
      orderBy = { createdAt: 'desc'}
  }

  const where = keyword
    ? {
      OR: [
        { title: { contains: keyword, mode: 'insensitive' } },
        { content: { contains: keyword, mode: 'insensitive' } }
      ]
    }
    : {}

  return await prisma.article.findMany({
    where,
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true
    },
    orderBy,
    skip: parseInt(offset),
    take: parseInt(limit)
  })
}

export async function getArticle(articleId) {
  return await prisma.article.findUniqueOrThrow({
    where: { id: articleId },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true
    }
  })
}

export async function createArticle(data) {
  return await prisma.article.create({
    data
  })
}

export async function patchArticle(articleId, data) {
  return await prisma.article.update({
    where: { id: articleId },
    data: {
      title: data.title ?? Prisma.skip,
      content: data.content ?? Prisma.skip
    }
  })
}

export async function deleteArticle(articleId) {
  return await prisma.article.delete({
    where: { id: articleId }
  })
}
