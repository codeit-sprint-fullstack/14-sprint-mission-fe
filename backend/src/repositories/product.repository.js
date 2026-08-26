import prisma from "../lib/prisma.js";

function buildProductWhere(keyword) {
  if (!keyword) {
    return {};
  }

  return {
    name: {
      contains: keyword,
      mode: "insensitive",
    },
  };
}

async function save({ name, description, price, tags, images, userId }) {
  return prisma.product.create({
    data: {
      name,
      description,
      price,
      tags,
      user: {
        connect: {
          id: userId,
        },
      },
      images: {
        create: images.map((path) => ({
          path,
        })),
      },
    },
    include: {
      images: {
        select: {
          path: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
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

async function findMany({ keyword, orderBy, skip, take }) {
  const where = buildProductWhere(keyword);

  const productOrderBy =
    orderBy === "favorite"
      ? [
          {
            favoriteCount: "desc",
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

  return prisma.product.findMany({
    where,
    orderBy: productOrderBy,
    skip,
    take,
    include: {
      images: {
        select: {
          path: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
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

async function count(keyword) {
  return prisma.product.count({
    where: buildProductWhere(keyword),
  });
}

async function findById(productId) {
  return prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: {
        select: {
          path: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      user: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },
      comments: {
        orderBy: {
          createdAt: "desc",
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
      },
    },
  });
}

async function update(productId, { name, description, price, tags, images }) {
  const data = {};

  if (name !== undefined) {
    data.name = name;
  }

  if (description !== undefined) {
    data.description = description;
  }

  if (price !== undefined) {
    data.price = price;
  }

  if (tags !== undefined) {
    data.tags = tags;
  }

  if (images !== undefined) {
    data.images = {
      deleteMany: {},
      create: images.map((path) => ({
        path,
      })),
    };
  }

  return prisma.product.update({
    where: {
      id: productId,
    },
    data,
    include: {
      images: {
        select: {
          path: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
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

async function remove(productId) {
  return prisma.product.delete({
    where: {
      id: productId,
    },
  });
}

async function addLike(userId, productId) {
  return prisma.$transaction(async (tx) => {
    const existingLike = await tx.productLike.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingLike) {
      return null;
    }

    await tx.productLike.create({
      data: {
        userId,
        productId,
      },
    });

    return tx.product.update({
      where: {
        id: productId,
      },
      data: {
        favoriteCount: {
          increment: 1,
        },
      },
      select: {
        favoriteCount: true,
      },
    });
  });
}

async function removeLike(userId, productId) {
  return prisma.$transaction(async (tx) => {
    const existingLike = await tx.productLike.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (!existingLike) {
      return null;
    }

    await tx.productLike.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    return tx.product.update({
      where: {
        id: productId,
      },
      data: {
        favoriteCount: {
          decrement: 1,
        },
      },
      select: {
        favoriteCount: true,
      },
    });
  });
}

export default {
  save,
  findMany,
  count,
  findById,
  update,
  remove,
  addLike,
  removeLike,
};
