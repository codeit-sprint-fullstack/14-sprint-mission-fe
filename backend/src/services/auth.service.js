import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError.js";
import userRepository from "../repositories/user.repository.js";

function filterSensitiveUserData(user) {
  const { encryptedPassword, ...rest } = user;
  return rest;
}

function createAccessToken(user) {
  const payload = {
    userId: user.id,
  };

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

export async function signUp({ email, nickname, password }) {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new AppError(409, "이미 사용 중인 이메일입니다.");
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const createdUser = await userRepository.save({
    email,
    nickname,
    encryptedPassword,
  });

  return filterSensitiveUserData(createdUser);
}

export async function login({ email, password }) {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new AppError(401, "이메일 또는 비밀번호가 올바르지 않습니다.");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.encryptedPassword,
  );

  if (!isPasswordCorrect) {
    throw new AppError(401, "이메일 또는 비밀번호가 올바르지 않습니다.");
  }

  const accessToken = createAccessToken(user);

  return {
    accessToken,
    user: filterSensitiveUserData(user),
  };
}

export async function getCurrentUser(userId) {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new AppError(401, "사용자 정보를 확인할 수 없습니다.");
  }

  return filterSensitiveUserData(user);
}
