import prisma from "../lib/prisma.js";

async function findByEmail(email) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function findById(id) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

async function save(userData) {
  return prisma.user.create({
    data: userData,
  });
}

export default {
  findByEmail,
  findById,
  save,
};
