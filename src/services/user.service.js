import { userRepository } from "../repositories/user.repository.js";
import { serializeUser } from "../serializers/user.serializer.js";
import { NotFound, Unprocessable } from "../errors/HttpError.js";

export const userService = {
  async getMe(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw NotFound("유저를 찾을 수 없습니다.");
    return serializeUser(user);
  },

  async updateMe(userId, { nickname, image }) {
    const data = {};
    if (nickname !== undefined) data.nickname = nickname;
    if (image !== undefined) data.image = image;

    try {
      const user = await userRepository.update(userId, data);
      return serializeUser(user);
    } catch (err) {
      if (err?.code === "P2002") throw Unprocessable("이미 사용 중인 닉네임 입니다.");
      throw err;
    }
  },
};
