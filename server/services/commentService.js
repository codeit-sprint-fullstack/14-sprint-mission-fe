import prisma from '../lib/prisma.js'

export async function getProductComments(productId, query = {}) {
  const { limit = 3, cursor } = query

  return await prisma.comment.findMany({
    where: { productId },
    select: {
      id: true,
      content: true, 
      createdAt: true
    },
    take: parseInt(limit),
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'desc' }
  })
}

export async function getArticleComments(articleId, query = {}) {
  const { limit = 3, cursor } = query

  return await prisma.comment.findMany({
    where: { articleId },
    select: {
      id: true,
      content: true,
      createdAt: true
    },
    take: parseInt(limit),
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'desc' }
  })
}

export async function createProductComment(productId, data) {
  return await prisma.comment.create({
    data: {
      content: data.content,
      product: { connect: { id: productId } }
    }
  })
}

export async function createArticleComment(articleId, data) {
  return await prisma.comment.create({
    data: {
      content: data.content,
      article: { connect: { id: articleId } }
    }
  })
}

export async function patchComment(commentId, data) {
  return await prisma.comment.update({
    where: { id: commentId },
    data: {
      content: data.content
    }
  })
}

export async function deleteComment(commentId) {
  return await prisma.comment.delete({
    where: { id: commentId }
  })
}