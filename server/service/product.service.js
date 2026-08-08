import 'dotenv/config'
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

//get, 정렬 / 페이지네이션 기능 구현
export async function getProductList(sort, keyword, page, pageSize) {

  const where = {};

  if (keyword) {
    where.OR = [
      { name: { contains: keyword } },
      { description: { contains: keyword } },
    ]
  }
  const offset = (page - 1) * pageSize;

  const pageList = await prisma.product.findMany({
    where,
    skip: offset,
    take: pageSize,
    orderBy: { createdAt: sort === 'oldest' ? 'asc' : 'desc' }
  })

  const totalCount = await prisma.product.count({ where })

  return { pageList, totalCount };
}

export async function getProduct(id) {
  return await prisma.product.findUnique({ where: { id } });
}

//post, 상품 등록 기능 구현
export async function createProduct(data) {
  return await prisma.product.create({ data });
}

//patch, 상품 수정 기능 구현
export async function patchProduct(id, data) {
  return await prisma.product.update({ where: { id }, data })
}

//delete, 상품 삭제 기능 구현
export async function deleteProduct(id) {
  return await prisma.product.delete({ where: { id } })
}