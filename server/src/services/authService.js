import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import createHttpError from "../utils/createHttpError.js";

const SALT_ROUNDS = 10;

async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password, encryptedPassword) {
  return bcrypt.compare(password, encryptedPassword);
}

function createAccessToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

function validateExistingUser(existingUser, email, nickname) {
  if (!existingUser) {
    return;
  }

  if (existingUser.email === email) {
    throw createHttpError(409, "이미 사용 중인 이메일입니다.");
  }

  if (existingUser.nickname === nickname) {
    throw createHttpError(409, "이미 사용 중인 닉네임입니다.");
  }
}

export async function signUp({
  email,
  nickname,
  password,
  passwordConfirmation,
}) {
  const normalizedEmail = email?.trim().toLowerCase();
  const normalizedNickname = nickname?.trim();

  if (!normalizedEmail) {
    throw createHttpError(400, "이메일을 입력해 주세요.");
  }

  if (!normalizedNickname) {
    throw createHttpError(400, "닉네임을 입력해 주세요.");
  }

  if (!password) {
    throw createHttpError(400, "비밀번호를 입력해 주세요.");
  }

  if (passwordConfirmation !== undefined && password !== passwordConfirmation) {
    throw createHttpError(400, "비밀번호가 일치하지 않습니다.");
  }

  const existingUser = await userRepository.findExistingUser(
    normalizedEmail,
    normalizedNickname,
  );

  validateExistingUser(existingUser, normalizedEmail, normalizedNickname);

  const encryptedPassword = await hashPassword(password);

  const user = await userRepository.createUser({
    email: normalizedEmail,
    nickname: normalizedNickname,
    encryptedPassword,
  });

  const accessToken = createAccessToken(user.id);

  return { accessToken };
}

export async function signIn({ email, password }) {
  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedEmail) {
    throw createHttpError(400, "이메일을 입력해 주세요.");
  }

  if (!password) {
    throw createHttpError(400, "비밀번호를 입력해 주세요.");
  }

  const user = await userRepository.findUserByEmail(normalizedEmail);

  if (!user) {
    throw createHttpError(401, "이메일 또는 비밀번호가 올바르지 않습니다.");
  }

  const isValidPassword = await verifyPassword(
    password,
    user.encryptedPassword,
  );

  if (!isValidPassword) {
    throw createHttpError(401, "이메일 또는 비밀번호가 올바르지 않습니다.");
  }

  const accessToken = createAccessToken(user.id);

  return { accessToken };
}
