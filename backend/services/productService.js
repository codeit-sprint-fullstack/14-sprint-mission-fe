import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { assert } from "superstruct";
import { CreateProduct, PatchProduct } from "../structs.js";

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export const getProducts = async ({
  page,
  pageSize,
  orderBy,
  keyword,
  where,
}) => {
  const [list, totalCount] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: orderBy,
    }),
    prisma.product.count({ where }),
  ]);

  return { list, totalCount };
};

export const getProductById = async (id) => {
  return prisma.product.findUnique({where: {id}});
};

export const createProduct = async (data) => {
  data.images = [];
  data.ownerId = "4ce8c329-3b0d-4603-ba16-d9a6eb7de7ff";

  return prisma.product.create({ data });
};

export const updateProduct = async (id, data) => {
  return prisma.product.update({where: {id}, data});
};

export const deleteProduct = async (id) => {
  await prisma.product.delete({where: {id}});
}
