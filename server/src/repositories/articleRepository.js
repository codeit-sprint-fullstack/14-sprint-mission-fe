import prisma from "../lib/prisma.js";
import {
  createCommentsSelect,
  createLikeSelect,
  ownerSelect,
} from "./commonSelects.js";
import { createOrderBy } from "./queryHelpers.js";

const articleBaseSelect = {
  id: true,
  title: true,
  content: true,
  createdAt: true,
  updatedAt: true,
  owner: {
    select: ownerSelect,
  },
};

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

async function findAll({ skip, take, keyword, orderBy, userId }) {
  return prisma.article.findMany({
    skip,
    take,
    where: createWhere(keyword),
    orderBy: createOrderBy(orderBy, "articleLikes"),
    select: {
      ...articleBaseSelect,
      ...createLikeSelect("articleLikes", userId),
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
    select: articleBaseSelect,
  });
}

async function findById(id, userId, commentLimit) {
  return prisma.article.findUnique({
    where: {
      id,
    },
    select: {
      ...articleBaseSelect,
      ...createLikeSelect("articleLikes", userId),
      comments: createCommentsSelect(commentLimit),
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
    select: articleBaseSelect,
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
