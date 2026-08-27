import prisma from "../lib/prisma.js";
import { articleWriterSelect, articleLikeInclude } from "../serializers/article.serializer.js";

export const articleRepository = {
  findById: (id) => prisma.article.findUnique({ where: { id } }),

  findByIdDetailed: (id, viewerId) =>
    prisma.article.findUnique({
      where: { id },
      include: { ...articleWriterSelect, ...articleLikeInclude(viewerId) },
    }),

  findMany: ({ where, orderBy, skip, take, viewerId }) =>
    prisma.article.findMany({
      where,
      orderBy,
      skip,
      take,
      include: { ...articleWriterSelect, ...articleLikeInclude(viewerId) },
    }),

  count: (where) => prisma.article.count({ where }),

  create: (data) => prisma.article.create({ data, include: articleWriterSelect }),

  update: (id, data, viewerId) =>
    prisma.article.update({
      where: { id },
      data,
      include: { ...articleWriterSelect, ...articleLikeInclude(viewerId) },
    }),

  remove: (id) => prisma.article.delete({ where: { id } }),

  // ===== 좋아요 =====
  findLike: (userId, articleId) =>
    prisma.articleLike.findUnique({ where: { userId_articleId: { userId, articleId } } }),

  addLikeTx: (userId, articleId) =>
    prisma.$transaction([
      prisma.articleLike.create({ data: { userId, articleId } }),
      prisma.article.update({ where: { id: articleId }, data: { likeCount: { increment: 1 } } }),
    ]),

  removeLikeTx: (userId, articleId) =>
    prisma.$transaction([
      prisma.articleLike.delete({ where: { userId_articleId: { userId, articleId } } }),
      prisma.article.update({ where: { id: articleId }, data: { likeCount: { decrement: 1 } } }),
    ]),
};
