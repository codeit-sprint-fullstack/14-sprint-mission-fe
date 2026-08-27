import prisma from "../lib/prisma.js";
import { commentWriterSelect } from "../serializers/comment.serializer.js";

export const commentRepository = {
  findById: (id) => prisma.comment.findUnique({ where: { id } }),

  // cursor(id 내림차순) 페이지네이션 — hasMore 판단을 위해 limit + 1 개 조회
  findManyByParent: ({ parentKey, parentId, limit, cursor }) =>
    prisma.comment.findMany({
      where: { [parentKey]: parentId },
      orderBy: { id: "desc" },
      take: limit + 1,
      ...(cursor == null ? {} : { cursor: { id: cursor }, skip: 1 }),
      include: commentWriterSelect,
    }),

  create: (data) => prisma.comment.create({ data, include: commentWriterSelect }),

  update: (id, data) =>
    prisma.comment.update({ where: { id }, data, include: commentWriterSelect }),

  remove: (id) => prisma.comment.delete({ where: { id } }),
};
