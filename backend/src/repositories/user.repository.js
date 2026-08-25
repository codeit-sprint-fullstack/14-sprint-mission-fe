import prisma from "../lib/prisma.js";

async function findByEmail(email) {
  return prisma.user.findUnique({
    where: {
      email,
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
  save,
};
