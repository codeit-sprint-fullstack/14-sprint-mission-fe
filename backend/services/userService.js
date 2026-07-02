import dotenv from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { assert } from 'superstruct';
import { CreateUser } from '../structs.js';

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export const getUsers = async () => {
    return prisma.user.findMany();
};

export const getUserById = async (id) => {
    return prisma.user.findUniqueOrThrow({where: {id}});
};

export const createUser = async (data) => {
    return prisma.user.create({ data });
};