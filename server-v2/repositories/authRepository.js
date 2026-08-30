import prisma from '../config/prisma.js';

// 토큰 갱신용
async function findById(userId) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    }
  })
}

// 회원가입 시, 이메일 중복 확인용
async function findByEmail(email) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

// 회원가입 - 유저 정보 DB에 저장
async function save(user) {
  return prisma.user.create({
    data: {
      email: user.email,
      nickname: user.nickname,
      encryptedPassword: user.encryptedPassword,
    },
  });
}

// 로그인 시, RT DB에 저장
async function updateRefreshToken(userId, refreshToken) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      refreshToken,
    }
  });
}

// Google oauth
async function upsertOAuthUser(provider, providerId, email, nickname) {
  return await prisma.user.upsert({
    where: { provider, providerId },
    update: { email, nickname }, // where 조건의 데이터가 존재할 때 변경할 데이터
    create: { provider, providerId, email, nickname } // where 조건의 데이터가 없을 때 새로 생성할 전체 데이터 
  });
}

export default {
  findById,
  findByEmail,
  save,
  updateRefreshToken,
  upsertOAuthUser,
}