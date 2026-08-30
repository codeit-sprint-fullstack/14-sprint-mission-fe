import prisma from '../config/prisma.js';

// 유저 이미지 수정하기
async function updateImage(userId, image) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: image,
  })
}

// 유저 비밀번호 가져오기
async function getPassword(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      encryptedPassword: true,
    },
  });

  return user.encryptedPassword;
}

// 유저 비밀번호 변경하기
async function updatePassword(userId, password) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      encryptedPassword: password,
    },
  });
}

// 유저가 올린 상품 가져오기
async function getProducts({ userId, offset, limit, keyword }) {
  const where = {
    userId,
    ...(keyword 
    ? {
        OR: [
          { name: { contains: keyword, mode: 'insensitive' } },
          { description: { contains: keyword, mode: 'insensitive' } },
        ]
      }
    : {})
  };


  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' },
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
    prisma.product.count({ 
      where, 
    }),
  ]);

  return {
    totalCount,
    products,
  }
}

// 유저가 좋아요 누른 상품 가져오기
async function getFavoriteProducts({ userId, offset, limit, keyword }) {
  const where = {
    favorites: {
      some: {
        userId,
      }
    },
    ...(keyword 
      ? {
        OR: [
          { name: { contains: keyword, mode: 'insensitive' } },
          { description: { contains: keyword, mode: 'insensitive'} },
        ]
      } 
      : {})
  };

  const [favorites, totalCount] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' },
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
    }),
    prisma.product.count({ where }),
  ]);

  return {
    favorites,
    totalCount,
  }
}

export default {
  updateImage,
  getPassword,
  updatePassword,
  getProducts,
  getFavoriteProducts,
}