import data from './seedData.js';

import 'dotenv/config'
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

//안에 있는 것들 다 지우고
await prisma.product.deleteMany();
//시드데이터 다 넣는다
await prisma.product.createMany({ data })
//닫는다.
await prisma.$disconnect();