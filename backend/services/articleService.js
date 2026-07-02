import dotenv from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { assert } from 'superstruct';
import { CreateArticle } from '../structs.js';

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export const getArticles = async () => {
    return prisma.article.findMany();
};

export const getArticleByid = async (id) => {
    return prisma.article.findUniqueOrThrow({where: {id}});
};

export const createArticle = async (data) => {
    return prisma.article.create({ data });
};