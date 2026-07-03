import "dotenv/config";
import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = pkg;

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export default prisma;

// const totalCount = await Product.countDocuments(filter);
// const products = await Product.find(filter)
//   .sort(sort === "recent" ? "-createdAt" : "createdAt")
//   .skip(offsetNum)
//   .limit(limitNum);
