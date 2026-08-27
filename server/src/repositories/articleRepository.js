import prisma from "../lib/prisma.js";

function createWhere(keyword) {
  return keyword
    ? {
        OR: [
          {
            title: {
              contains: keyword,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: keyword,
              mode: "insensitive",
            },
          },
        ],
      }
    : undefined;
}

function createOrderBy(orderBy) {
  return orderBy === "likes"
    ? [
        {
          articleLikes: {
            _count: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ]
    : [
        {
          createdAt: "desc",
        },
      ];
}

async function findAll({ skip, take, keyword, orderBy, userId }) {
  return prisma.article.findMany({
    skip,
    take,
    where: createWhere(keyword),
    orderBy: createOrderBy(orderBy),
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,

      owner: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },

      _count: {
        select: {
          articleLikes: true,
        },
      },

      ...(userId && {
        articleLikes: {
          where: {
            userId,
          },
          select: {
            userId: true,
          },
        },
      }),
    },
  });
}

async function countAll({ keyword }) {
  return prisma.article.count({
    where: createWhere(keyword),
  });
}

async function create({ title, content, ownerId }) {
  return prisma.article.create({
    data: {
      title,
      content,
      ownerId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      owner: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },
    },
  });
}

async function findById(id, userId) {
  return prisma.article.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,

      owner: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },

      _count: {
        select: {
          articleLikes: true,
        },
      },

      ...(userId && {
        articleLikes: {
          where: {
            userId,
          },
          select: {
            userId: true,
          },
        },
      }),
    },
  });
}

async function findOwnerById(id) {
  return prisma.article.findUnique({
    where: {
      id,
    },
    select: {
      ownerId: true,
    },
  });
}

async function updateById(id, data) {
  return prisma.article.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      owner: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },
    },
  });
}

async function deleteById(id) {
  return prisma.article.delete({
    where: {
      id,
    },
  });
}

async function addLike(articleId, userId) {
  return prisma.$transaction(async (tx) => {
    const article = await tx.article.findUnique({
      where: {
        id: articleId,
      },
      select: {
        id: true,
      },
    });

    if (!article) {
      return null;
    }

    await tx.articleLike.upsert({
      where: {
        userId_articleId: {
          userId,
          articleId,
        },
      },
      create: {
        userId,
        articleId,
      },
      update: {},
    });

    const likeCount = await tx.articleLike.count({
      where: {
        articleId,
      },
    });

    return {
      likeCount,
    };
  });
}

async function removeLike(articleId, userId) {
  return prisma.$transaction(async (tx) => {
    const article = await tx.article.findUnique({
      where: {
        id: articleId,
      },
      select: {
        id: true,
      },
    });

    if (!article) {
      return null;
    }

    await tx.articleLike.deleteMany({
      where: {
        userId,
        articleId,
      },
    });

    const likeCount = await tx.articleLike.count({
      where: {
        articleId,
      },
    });

    return {
      likeCount,
    };
  });
}

export default {
  findAll,
  countAll,
  create,
  findById,
  findOwnerById,
  updateById,
  deleteById,
  addLike,
  removeLike,
};
