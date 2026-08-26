import prisma from '../config/prisma.js';

// 게시글 생성하기
async function save(article, userId) {
  return await prisma.article.create({
    data: {
      title: article.title,
      content: article.content,
      userId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });
}

// 게시글 목록 가져오기
async function findMany({ offset, limit, orderBy, keyword }) {
  const where = {
        OR: [
      { title: { contains: keyword, mode: 'insensitive' } },
      { content: { contains: keyword, mode: 'insensitive' } },
    ],
  };

  const [articles, totalCount] = await Promise.all([
    prisma.article.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: orderBy === 'recent'
        ? { createdAt: 'desc' }
        : { likes: { _count: 'desc' } },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      }
    }),
    prisma.article.count({ where })
  ]);

  return {
    totalCount,
    articles,
  };
}

// 게시글 가져오기
async function findUnique(articleId) {
  return await prisma.article.findUnique({
    where: {
      id: articleId,
    },
    include: {
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });
}

// 게시글 수정하기
async function update(articleId, article) {
  return await prisma.article.update({
    where: {
      id: articleId,
    },
    data: {
      title: article.title,
      content: article.content,
    },
    include: {
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });
}

// 게시글 삭제하기
async function remove(articleId) {
  return await prisma.article.delete({
    where: {
      id: articleId,
    },
    select: {
      id: true,
    },
  });
}

// 게시글 좋아요 가져오기
async function findLike(articleId, userId) {
  return await prisma.articleLike.findUnique({
    where: {
      userId_articleId: {
        userId,
        articleId,
      },
    },
  });
}

// 게시글 좋아요 생성하기
async function saveLike(articleId, userId) {
  await prisma.articleLike.create({
    data: {
      articleId,
      userId,
    },
  });
}

// 게시글 좋아요 삭제하기
async function removeLike(articleId, userId) {
  return await prisma.articleLike.delete({
    where: {
      userId_articleId: {
        userId,
        articleId,
      },
    },
  });
}

export default {
  save,
  findMany,
  findUnique,
  update,
  remove,
  findLike,
  saveLike,
  removeLike,
}