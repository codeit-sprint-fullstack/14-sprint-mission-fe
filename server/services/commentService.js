import prisma from '../lib/prisma.js'

export async function getProductComments(productId, query = {}) {
  const { limit = 3, cursor } = query
  const parsedLimit = parseInt(limit)

  const comments = await prisma.comment.findMany({
    where: { productId },
    select: {
      id: true,
      content: true, 
      createdAt: true
    },
    take: parsedLimit + 1,  // 다음 페이지 존재 여부를 확인하기 위해 limit보다 1개 더 조회
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'desc' }
  })

  // 다음 페이지 존재 여부 확인
  const hasNextPage = comments.length > parsedLimit
  // 다음 페이지가 있다면 확인용으로 추가 조회한 마지막 댓글 제거
  if(hasNextPage) {
    comments.pop()
  }

  return {
    list: comments,
    // 다음 페이지가 있을 때, 현재 응답의 마지막 댓글의 ID를 cursor로 전달
    nextCursor : hasNextPage ? comments[comments.length - 1].id : null
  }
}

export async function getArticleComments(articleId, query = {}) {
  const { limit = 3, cursor } = query;
  const parsedLimit = parseInt(limit);

  const comments = await prisma.comment.findMany({
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

  const hasNextPage = comments.length > parsedLimit;

  if (hasNextPage) {
    comments.pop();
  }

  return {
    list: comments,
    nextCursor: hasNextPage ? comments[comments.length - 1].id : null,
  };
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