import { userRepository } from "../repositories/user.repository.js";
import { serializeUser } from "../serializers/user.serializer.js";
import { BadRequest, Unauthorized, Unprocessable } from "../errors/HttpError.js";
import {
  hashPassword,
  comparePassword,
  generateTokens,
  verifyRefreshToken,
} from "../lib/auth.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 토큰 발급 + refreshToken 저장 (sliding session)
async function issueTokens(userId) {
  const tokens = generateTokens(userId);
  await userRepository.setRefreshToken(userId, tokens.refreshToken);
  return tokens;
}

export const authService = {
  async signUp({ email, nickname, password, passwordConfirmation }) {
    if (!email || !nickname || !password) {
      throw BadRequest("이메일, 닉네임, 비밀번호는 필수입니다.");
    }
    if (!EMAIL_RE.test(email)) throw BadRequest("이메일 형식이 올바르지 않습니다.");
    if (password.length < 8) throw BadRequest("비밀번호는 8자 이상이어야 합니다.");
    if (passwordConfirmation !== undefined && password !== passwordConfirmation) {
      throw BadRequest("비밀번호가 일치하지 않습니다.");
    }

    let user;
    try {
      user = await userRepository.create({
        email,
        nickname,
        encryptedPassword: await hashPassword(password),
      });
    } catch (err) {
      if (err?.code === "P2002") {
        const field = err.meta?.target?.[0] === "nickname" ? "닉네임" : "이메일";
        throw Unprocessable(`이미 사용 중인 ${field} 입니다.`);
      }
      throw err;
    }

    const tokens = await issueTokens(user.id);
    return { ...tokens, user: serializeUser(user) };
  },

  async signIn({ email, password }) {
    if (!email || !password) throw BadRequest("이메일과 비밀번호를 입력해주세요.");

    const user = await userRepository.findByEmail(email);
    if (!user || !(await comparePassword(password, user.encryptedPassword))) {
      throw Unauthorized("이메일 또는 비밀번호가 올바르지 않습니다.");
    }

    const tokens = await issueTokens(user.id);
    return { ...tokens, user: serializeUser(user) };
  },

  async refresh(refreshToken) {
    if (!refreshToken) throw BadRequest("refreshToken 이 필요합니다.");

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw Unauthorized("유효하지 않은 refreshToken 입니다.");
    }

    const user = await userRepository.findById(payload.userId);
    if (!user || user.refreshToken !== refreshToken) {
      throw Unauthorized("유효하지 않은 refreshToken 입니다.");
    }

    return issueTokens(user.id);
  },
};
