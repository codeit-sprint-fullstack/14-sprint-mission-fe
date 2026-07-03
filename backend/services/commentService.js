import dotenv from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { assert } from 'superstruct';
import { CreateComment } from '../structs.js';

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export const getComments = async (
  // articleId, 
  cursor, limit = 10) => {
  const comments = await prisma.comment.findMany({
    // where: {
    //   articleId,
    // },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit + 1,
    ...(cursor && {
      cursor: {
        id: cursor,
      },
      skip: 1,
    }),
  });

  const hasNextPage = comments.length > limit;

  if (hasNextPage) {
    comments.pop();
  }

  return {
    list: comments,
    nextCursor: hasNextPage
      ? comments[comments.length - 1].id
      : null,
    hasNextPage,
  };
};

export const getCommentById = (id) => {
  return prisma.comment.findUniqueOrThrow({where: {id}});
};

export const createComment = async (data, commentType) => {
  data.commentType = commentType;
  return prisma.comment.create({ data });
}

export const updateComment = async (id, data) => {
  return prisma.comment.update({where: {id}, data});
}

export const deleteComment = async (id) => {
  await prisma.comment.delete({where: {id}});
}