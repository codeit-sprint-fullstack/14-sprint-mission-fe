import bcrypt from "bcrypt";
import AppError from "../errors/AppError.js";
import userRepository from "../repositories/user.repository.js";

function filterSensitiveUserData(user) {
  const { encryptedPassword, ...rest } = user;
  return rest;
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
