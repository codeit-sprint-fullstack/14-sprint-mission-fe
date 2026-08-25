import userRepository from "../repositories/userRepository.js";

export async function getUserById(userId) {
  return userRepository.findUserById(userId);
}
