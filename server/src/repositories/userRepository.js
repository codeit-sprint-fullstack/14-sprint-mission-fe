import prisma from "../lib/prisma.js";

async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

async function findExistingUser(email, nickname) {
  return prisma.user.findFirst({
    where: {
      OR: [{ email }, { nickname }],
    },
  });
}

async function createUser({ email, nickname, encryptedPassword }) {
  return prisma.user.create({
    data: {
      email,
      nickname,
      encryptedPassword,
    },
  });
}

async function findUserById(userId) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      nickname: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

const userRepository = {
  findUserByEmail,
  findExistingUser,
  createUser,
  findUserById,
};

export default userRepository;
