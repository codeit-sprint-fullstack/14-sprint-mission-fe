import 'dotenv/config'
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

//get, 정렬 / 페이지네이션 기능 구현
export async function getArticleCommentList(articleId, cursor, take) {

  const commentList = await prisma.articleComment.findMany({
    where: { articleId },
    take,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'asc' }
  })

  return commentList;
}

export async function getArticleComment(id) {
  return await prisma.articleComment.findUnique({ where: { id } });
}

//post, 댓글 등록 기능 구현
export async function createArticleComment(articleId, data) {
  return await prisma.articleComment.create({
    data: { content: data.content, articleId }
  })
}

//patch, 댓글 수정 기능 구현
export async function patchArticleComment(id, data) {
  return await prisma.articleComment.update({ where: { id }, data })
}

//delete, 댓글 삭제 기능 구현
export async function deleteArticleComment(id) {
  return await prisma.articleComment.delete({ where: { id } })
}