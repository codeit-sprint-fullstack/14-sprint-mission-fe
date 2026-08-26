import prisma from '../config/prisma.js';

async function save(product, userId) {
  return await prisma.product.create({
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      userId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
      _count: {
        select: {
          favorites: true,
        },
      },
    },
  });
}

async function findMany({ offset, limit, orderBy, keyword }) {
  const where = {
    OR: [
      { name: { contains: keyword, mode: 'insensitive' } },
      { description: { contains: keyword, mode: 'insensitive' } ,}
    ]
  };

  const [ products, totalCount ] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: orderBy === 'recent' 
        ? { createdAt: 'desc' }
        : { favorites: { _count: 'desc' } },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
          },
        },
        _count: {
          select: {
            favorites: true,
          },
        },
      }
    }),
    prisma.product.count({ where })
  ]);

  return {
    totalCount,
    products
  };
}

async function findUnique(productId) {
  return await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
      _count: {
        select: {
          favorites: true,
        },
      },
    },
  });
}

async function update(productId, product) {
  return await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
    },
    include: {
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
      _count: {
        select: {
          favorites: true,
        },
      },
    },
  });
}

async function remove(productId) {
  return await prisma.product.delete({
    where: {
      id: productId,
    },
    select: {
      id: true,
    },
  });
}

async function findFavorite(productId, userId) {
  return await prisma.productFavorite.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
}

async function saveFavorite(productId, userId) {
  return await prisma.productFavorite.create({
    data: {
      userId,
      productId,
    },
  });
}

async function removeFavorite(productId, userId) {
  return await prisma.productFavorite.delete({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
}

export default {
  save,
  findMany,
  findUnique,
  update,
  remove,
  findFavorite,
  saveFavorite,
  removeFavorite,
}