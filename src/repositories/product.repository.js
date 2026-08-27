import prisma from "../lib/prisma.js";
import { productOwnerSelect, productFavoriteInclude } from "../serializers/product.serializer.js";

export const productRepository = {
  findById: (id) => prisma.product.findUnique({ where: { id } }),

  findByIdDetailed: (id, viewerId) =>
    prisma.product.findUnique({
      where: { id },
      include: { ...productOwnerSelect, ...productFavoriteInclude(viewerId) },
    }),

  findMany: ({ where, orderBy, skip, take, viewerId }) =>
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take,
      include: { ...productOwnerSelect, ...productFavoriteInclude(viewerId) },
    }),

  count: (where) => prisma.product.count({ where }),

  create: (data) => prisma.product.create({ data, include: productOwnerSelect }),

  update: (id, data) =>
    prisma.product.update({ where: { id }, data, include: productOwnerSelect }),

  remove: (id) => prisma.product.delete({ where: { id } }),

  // ===== 좋아요 =====
  findFavorite: (userId, productId) =>
    prisma.favorite.findUnique({ where: { userId_productId: { userId, productId } } }),

  addFavoriteTx: (userId, productId) =>
    prisma.$transaction([
      prisma.favorite.create({ data: { userId, productId } }),
      prisma.product.update({ where: { id: productId }, data: { favoriteCount: { increment: 1 } } }),
    ]),

  removeFavoriteTx: (userId, productId) =>
    prisma.$transaction([
      prisma.favorite.delete({ where: { userId_productId: { userId, productId } } }),
      prisma.product.update({ where: { id: productId }, data: { favoriteCount: { decrement: 1 } } }),
    ]),
};
