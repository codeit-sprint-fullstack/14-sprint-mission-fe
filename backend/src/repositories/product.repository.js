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

export default {
  save,
  findMany,
  count,
};
