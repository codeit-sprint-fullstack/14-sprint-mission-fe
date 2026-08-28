import userRepository from "../repositories/userRepository.js";
import createHttpError from "../utils/createHttpError.js";

export async function getUserById(userId) {
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throw createHttpError(404, "사용자를 찾을 수 없습니다.");
  }

  return user;
}
