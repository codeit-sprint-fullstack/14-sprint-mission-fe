import prisma from "../lib/prisma.js";
import { commentSelect } from "./commonSelects.js";

async function createComment({ content, productId, articleId, ownerId }) {
  return prisma.comment.create({
    data: {
      content,
      productId,
      articleId,
      ownerId,
    },
    select: commentSelect,
  });
}

async function findComments({ productId, articleId, cursor, take }) {
  return prisma.comment.findMany({
    where: {
      productId,
      articleId,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: cursor ? 1 : 0,
    take,
    ...(cursor && {
      cursor: {
        id: cursor,
      },
    }),
    select: commentSelect,
  });
}

async function findOwnerById(id) {
  return prisma.comment.findUnique({
    where: {
      id,
    },
    select: {
      ownerId: true,
    },
  });
}

async function updateById(id, content) {
  return prisma.comment.update({
    where: {
      id,
    },
    data: {
      content,
    },
    select: commentSelect,
  });
}

async function deleteById(id) {
  return prisma.comment.delete({
    where: {
      id,
    },
  });
}

export default {
  createComment,
  findComments,
  findOwnerById,
  updateById,
  deleteById,
};
