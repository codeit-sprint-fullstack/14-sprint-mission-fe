import 'dotenv/config'
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

//get, 정렬 / 페이지네이션 기능 구현
export async function getArticleList(sort, keyword, page, pageSize) {

  const where = {};

  if (keyword) {
    where.OR = [
      { title: { contains: keyword } },
      { content: { contains: keyword } },
    ]
  }
  const offset = (page - 1) * pageSize;

  const pageList = await prisma.article.findMany({
    where,
    skip: offset,
    take: pageSize,
    orderBy: { createdAt: sort === 'oldest' ? 'asc' : 'desc' }
  })

  const totalCount = await prisma.article.count({ where })

  return { pageList, totalCount };
}

export async function getArticle(id) {
  return await prisma.article.findUnique({ where: { id } });
}

//post, 게시글 등록 기능 구현
export async function createArticle(data) {
  return await prisma.article.create({ data });
}

//patch, 게시글 수정 기능 구현
export async function patchArticle(id, data) {
  return await prisma.article.update({ where: { id }, data })
}

//delete, 게시글 삭제 기능 구현
export async function deleteArticle(id) {
  return await prisma.article.delete({ where: { id } })
}