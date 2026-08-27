import prisma from "../lib/prisma.js";

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

export default {
  create,
  findOwnerById,
  updateById,
  deleteById,
};
