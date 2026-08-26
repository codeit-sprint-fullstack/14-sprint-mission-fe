import prisma from '../config/prisma.js';

// 댓글 생성하기
async function save({ productId =  null, articleId = null, comment, userId }) {
  return await prisma.comment.create({
    data: {
      articleId,
      productId,
      userId,
      content: comment.content,
    },
    include: {
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
    },
  });
}

// 댓글 목록 가져오기
async function findMany({ productId = null, articleId = null, limit, cursor }) {
  const comments = await prisma.comment.findMany({
    where: {
      productId,
      articleId,
    },
    include: {
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
    },
    take: limit + 1, // 다음 페이지 존재 여부 확인용
    skip: cursor ? 1 : 0, // 첫 요청이 아닌 경우, 건너뛰기
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'desc' },
  })

  // 커서 기반 페이지네이션 
  const hasNextPage = comments.length > limit;
  if (hasNextPage) { comments.pop() }

  return {
    nextCursor: hasNextPage ? comments[comments.length - 1].id : null,
    comments,
  }
}

// 댓글 가져오기
async function findUnique(commentId) {
  return await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
    },
  });
}

// 댓글 수정하기
async function update(commentId, comment) {
  return await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content: comment.content,
    },
    include: {
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
    },
  });
}

// 댓글 삭제하기
async function remove(commentId) {
  return await prisma.comment.delete({
    where: {
      id: commentId,
    },
    select: {
      id: true,
    },
  });
}

export default {
  save,
  findMany,
  findUnique,
  update,
  remove,
}