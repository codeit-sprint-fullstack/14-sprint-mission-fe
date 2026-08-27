import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES || "1h";
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES || "14d";

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error("JWT_ACCESS_SECRET / JWT_REFRESH_SECRET 환경변수가 필요합니다.");
}

export const hashPassword = (plain) => bcrypt.hash(plain, 10);
export const comparePassword = (plain, hashed) => bcrypt.compare(plain, hashed);

export function generateTokens(userId) {
  const accessToken = jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
  const refreshToken = jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
  return { accessToken, refreshToken };
}

export const verifyAccessToken = (token) => jwt.verify(token, ACCESS_SECRET);
export const verifyRefreshToken = (token) => jwt.verify(token, REFRESH_SECRET);

// 클라이언트에 노출할 유저 형태 (password / refreshToken / email 제외)
// panda-market-api 의 GET /users/me 응답 스펙과 동일
export function toPublicUser(user) {
  return {
    id: user.id,
    nickname: user.nickname,
    image: user.image,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
