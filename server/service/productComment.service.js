import 'dotenv/config'
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

//get, 정렬 / 페이지네이션 기능 구현
export async function getProductCommentList(productId, cursor, take) {

  const commentList = await prisma.productComment.findMany({
    where: { productId },
    take,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'asc' }
  })

  return commentList;
}

export async function getProductComment(id) {
  return await prisma.productComment.findUnique({ where: { id } });
}

//post, 댓글 등록 기능 구현
export async function createProductComment(productId, data) {
  return await prisma.productComment.create({
    data: { content: data.content, productId }
  })
}

//patch, 댓글 수정 기능 구현
export async function patchProductComment(id, data) {
  return await prisma.productComment.update({ where: { id }, data })
}

//delete, 댓글 삭제 기능 구현
export async function deleteProductComment(id) {
  return await prisma.productComment.delete({ where: { id } })
}