import prisma from "../lib/prisma.js";

function createWhere(keyword) {
  return keyword
    ? {
        name: {
          contains: keyword,
          mode: "insensitive",
        },
      }
    : undefined;
}

function createOrderBy(orderBy) {
  return orderBy === "likes"
    ? [
        {
          productLikes: {
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
  return prisma.product.findMany({
    skip,
    take,
    where: createWhere(keyword),
    orderBy: createOrderBy(orderBy),
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      images: true,
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
          productLikes: true,
        },
      },

      ...(userId && {
        productLikes: {
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
  return prisma.product.count({
    where: createWhere(keyword),
  });
}

async function create({ name, description, price, tags, images, ownerId }) {
  return prisma.product.create({
    data: {
      name,
      description,
      price,
      tags,
      images,
      ownerId,
    },
  });
}

async function findById(id, userId, commentLimit) {
  return prisma.product.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      images: true,
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
          productLikes: true,
        },
      },

      comments: {
        orderBy: {
          createdAt: "desc",
        },
        take: commentLimit + 1,
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
      },

      ...(userId && {
        productLikes: {
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
  return prisma.product.findUnique({
    where: {
      id,
    },
    select: {
      ownerId: true,
    },
  });
}

async function updateById(id, data) {
  return prisma.product.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      images: true,
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
  return prisma.product.delete({
    where: {
      id,
    },
  });
}

async function addLike(productId, userId) {
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        id: true,
      },
    });

    if (!product) {
      return null;
    }

    await tx.productLike.upsert({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      create: {
        userId,
        productId,
      },
      update: {},
    });

    const likeCount = await tx.productLike.count({
      where: {
        productId,
      },
    });

    return {
      likeCount,
    };
  });
}

async function removeLike(productId, userId) {
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        id: true,
      },
    });

    if (!product) {
      return null;
    }

    await tx.productLike.deleteMany({
      where: {
        userId,
        productId,
      },
    });

    const likeCount = await tx.productLike.count({
      where: {
        productId,
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
