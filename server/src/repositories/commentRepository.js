import prisma from "../lib/prisma.js";

async function createProductComment({ content, productId, ownerId }) {
  return prisma.comment.create({
    data: {
      content,
      productId,
      ownerId,
    },
    select: {
      id: true,
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

async function findProductComments({ productId, cursor, take }) {
  return prisma.comment.findMany({
    where: {
      productId,
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
    select: {
      id: true,
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

export default {
  createProductComment,
  findProductComments,
};
