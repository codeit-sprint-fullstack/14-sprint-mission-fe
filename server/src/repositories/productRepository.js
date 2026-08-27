import prisma from "../lib/prisma.js";
import {
  createCommentsSelect,
  createLikeSelect,
  ownerSelect,
} from "./commonSelects.js";
import { createOrderBy } from "./queryHelpers.js";

const productBaseSelect = {
  id: true,
  name: true,
  description: true,
  price: true,
  tags: true,
  images: true,
  createdAt: true,
  updatedAt: true,
  owner: {
    select: ownerSelect,
  },
};

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

async function findAll({ skip, take, keyword, orderBy, userId }) {
  return prisma.product.findMany({
    skip,
    take,
    where: createWhere(keyword),
    orderBy: createOrderBy(orderBy, "productLikes"),
    select: {
      ...productBaseSelect,
      ...createLikeSelect("productLikes", userId),
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
    select: productBaseSelect,
  });
}

async function findById(id, userId, commentLimit) {
  return prisma.product.findUnique({
    where: {
      id,
    },
    select: {
      ...productBaseSelect,
      ...createLikeSelect("productLikes", userId),
      comments: createCommentsSelect(commentLimit),
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
      images: true,
    },
  });
}

async function updateById(id, data) {
  return prisma.product.update({
    where: {
      id,
    },
    data,
    select: productBaseSelect,
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
