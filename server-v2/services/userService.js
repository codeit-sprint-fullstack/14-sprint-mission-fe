import userRepository from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';

// 유저 응답 형식
function formatUser(user) {
  return {
    id: user.id,
    nickname: user.nickname,
    image: user.image,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

// 상품 응답 형식
function formatProductsItem(product) {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    tags: product.tags,
    images: product.images,
    ownerId: product.user.id,
    ownerNickname: product.user.nickname,
    favoriteCount: product._count.favorites,
    createdAt: product.createdAt,
  };
}

// (비밀번호 변경 시) 입력 비밀번호와 해시(DB)비밀번호 비교
async function verifyPassword(inputPassword, savedPassword) {
  const isValid = await bcrypt.compare(inputPassword, savedPassword);
  if (!isValid) {
    const error = new Error('Incorrect current password');
    error.code = 400;
    throw error;
  }
}

// (비밀번호 변경 시) 새로운 비밀번호 해시 처리
async function hashPassword(plainPassword) {
  return await bcrypt.hash(plainPassword, 10);
}

// 유저 가져오기
async function getMe(user) {
  return formatUser(user);
}

// 유저 이미지 수정하기
async function updateImage(userId, data) {
  const updatedUser = await userRepository.updateImage(userId, data);
  return formatUser(updatedUser);
}

// 유저 비밀번호 수정하기
async function updatePassword(userId, data) {
  // 1. 소셜 로그인 유저 (db에 비밀번호 없음) 에러 처리
  const savedPassword = await userRepository.getPassword(userId);
  if (!savedPassword) {
    const error = new Error('Password change is not available for this account');
    error.code = 400;
    throw error;
  }

  // 2. 입력한 현재 비밀번호가 유효한지 검사
  const inputPassword = data.currentPassword;
  await verifyPassword(inputPassword, savedPassword);

  // 3. 새 비밀번호와 확인 비밀번호가 동일한지 비교
  const newPassword = data.password;
  const newPasswordConfirmation = data.passwordConfirmation;
  if (newPassword !== newPasswordConfirmation) {
    const error = new Error('Password and password confirmation do not match');
    error.code = 400;
    throw error;
  }

  // 4. 통과하면 새 비밀번호 해시 처리 후 DB에 저장
  const encryptedNewPassword = await hashPassword(newPassword);
  const updatedUser = await userRepository.updatePassword(userId, encryptedNewPassword);

  return formatUser(updatedUser);
}

// 유저가 올린 상품 가져오기
async function getProducts(userId, query = {}) {
  const { page = 1, pageSize = 10, keyword = '' } = query;
  const pageNumber = Number(page);
  const pageSizeNumber = Number(pageSize);
  const offset = (pageNumber - 1) * pageSizeNumber;

  const { totalCount, products } = await userRepository.getProducts({ 
    userId, 
    offset, 
    limit: pageSizeNumber, 
    keyword 
  });

  return {
    totalCount,
    list: products.map(formatProductsItem),
  };
}

// 유저가 좋아요 누른 상품 가져오기
async function getFavoriteProducts(userId, query = {}) {
  const { page = 1, pageSize = 10, keyword = '' } = query;
  const pageNumber = Number(page);
  const pageSizeNumber = Number(pageSize);
  const offset = (pageNumber - 1) * pageSizeNumber;

  const { favorites, totalCount } = await userRepository.getFavoriteProducts({ 
    userId,
    offset,
    limit: pageSizeNumber,
    keyword
  });

  return {
    totalCount,
    list: favorites.map(formatProductsItem),
  }
}

export default {
  getMe,
  updateImage,
  updatePassword,
  getProducts,
  getFavoriteProducts,
}