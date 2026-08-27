import prisma from "../lib/prisma.js";

export const userRepository = {
  findById: (id) => prisma.user.findUnique({ where: { id } }),
  findByEmail: (email) => prisma.user.findUnique({ where: { email } }),
  findByNickname: (nickname) => prisma.user.findUnique({ where: { nickname } }),
  create: (data) => prisma.user.create({ data }),
  update: (id, data) => prisma.user.update({ where: { id }, data }),
  setRefreshToken: (id, refreshToken) =>
    prisma.user.update({ where: { id }, data: { refreshToken } }),
};
