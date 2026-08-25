import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authRepository from '../repositories/authRepository.js';

// 응답에 민감 정보 제외
function filterSensitiveUserData(user) {
  const { encryptedPassword, refreshToken, ...rest } = user;
  return rest;
}

// (회원가입 시) 비밀번호 해시 처리
function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, 10);
}

// 회원가입
async function createUser(user) {
  // 1. 중복된 이메일인지 확인
  const existedUser = await authRepository.findByEmail(user.email);
  if (existedUser) {
    const error = new Error('User already exists');
    error.code = 409;
    throw error;
  }
  // 2. 비밀번호, 비밀번호 확인 동일한지 비교
  if (user.password !== user.passwordConfirmation) {
    const error = new Error('Password is incorrect');
    error.code = 400;
    throw error;
  }
  // 3. 비밀번호 해시 처리
  const encryptedPassword = await hashPassword(user.password);
  // 4. 유저 정보 DB에 저장
  const createdUser = await authRepository.save({
    email: user.email,
    nickname: user.nickname,
    encryptedPassword,
  });
  // 5. 유저 정보 반환
  return filterSensitiveUserData(createdUser);
}

// (로그인 시) 입력 비밀번호와 해시(DB)비밀번호 비교
async function verifyPassword(inputPassword, savedPassword) {
  const isValid = await bcrypt.compare(inputPassword, savedPassword);
  if (!isValid) {
    const error = new Error('Unauthorized');
    error.code = 401;
    throw error;
  }
}

// 로그인
async function getUser(email, password) {
  // 1. 이메일로 유저 조회
  const user = await authRepository.findByEmail(email);
  if (!user || !user.encryptedPassword) {
    const error = new Error('Unauthorized');
    error.code = 401;
    throw error;
  }
  // 2. DB 비밀번호와 입력 비밀번호 동일한지 비교
  await verifyPassword(password, user.encryptedPassword);
  // 3. 일치하면, 유저 정보 반환
  return filterSensitiveUserData(user);
}

// (로그인 성공 시) 토큰 생성
function createToken(user, type) {
  const payload = { userId: user.id };
  const secret = type === 'refresh'
    ? process.env.JWT_REFRESH_SECRET
    : process.env.JWT_SECRET;
  const options = { expiresIn: type === 'refresh' ? '2w' : '1h' };
  return jwt.sign(payload, secret, options);
}

// 토큰 refresh
async function refreshToken(userId, refreshToken) {
  // 유저가 없거나 DB에 저장된 RT와 다른 경우, 에러
  const user = await authRepository.findById(userId);
  if (!user || user.refreshToken !== refreshToken) {
    const error = new Error('Unauthorized');
    error.code = 401;
    throw error;
  }
  // 통과하면 AT, RT refresh (슬라이딩)
  const accessToken = createToken(user, 'access');
  const newRefreshToken = createToken(user, 'refresh');
  return {
    accessToken,
    newRefreshToken,
  }
}

// 로그인 후 발급한 RT, DB에 저장
async function updateRefreshToken(userId, refreshToken) {
  await authRepository.updateRefreshToken(userId, refreshToken);
}

// Passport JWT 검증 후 사용자 조회
async function getUserById(userId) {
  const user = await authRepository.findById(userId);
  return user ? filterSensitiveUserData(user) : null;
}

// Google oauth
async function upsertOAuthUser(provider, providerId, email, nickname) {
  const user = await authRepository.upsertOAuthUser(provider, providerId, email, nickname);
  return filterSensitiveUserData(user);
}


export default {
  createUser,
  getUser,
  createToken,
  refreshToken,
  updateRefreshToken,
  getUserById,
  upsertOAuthUser,
}