import prisma from "../lib/prisma.js";

async function saveProductComment({ content, userId, productId }) {
  return prisma.comment.create({
    data: {
      content,
      user: { connect: { id: userId } },
      product: { connect: { id: productId } },
    },
    include: {
      user: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },
    },
  });
}

async function findById(commentId) {
  return prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });
}

async function update(commentId, content) {
  return prisma.comment.update({
    where: { id: commentId },
    data: { content },
    include: {
      user: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },
    },
  });
}

async function remove(commentId) {
  return prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
}

const commentRepository = {
  saveProductComment,
  findById,
  update,
  remove,
};

export default commentRepository;
