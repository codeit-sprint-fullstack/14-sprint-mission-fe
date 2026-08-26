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

export default {
  createProductComment,
};
