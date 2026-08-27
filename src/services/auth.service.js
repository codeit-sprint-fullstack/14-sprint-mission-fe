import { userRepository } from "../repositories/user.repository.js";
import { serializeUser } from "../serializers/user.serializer.js";
import { HttpError, BadRequest, Unauthorized, Unprocessable } from "../errors/HttpError.js";
import {
  hashPassword,
  comparePassword,
  generateTokens,
  verifyRefreshToken,
} from "../lib/auth.js";
import { verifyGoogleIdToken, verifyGoogleAccessToken } from "../lib/google.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 토큰 발급 + refreshToken 저장 (sliding session)
async function issueTokens(userId) {
  const tokens = generateTokens(userId);
  await userRepository.setRefreshToken(userId, tokens.refreshToken);
  return tokens;
}

// 닉네임 중복을 피해 유니크한 닉네임 생성
async function uniqueNickname(base) {
  let candidate = (base || "user").slice(0, 20);
  for (let i = 0; i < 5; i++) {
    if (!(await userRepository.findByNickname(candidate))) return candidate;
    candidate = `${(base || "user").slice(0, 14)}_${Math.random().toString(36).slice(2, 6)}`;
  }
  return `user_${Date.now().toString(36)}`;
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
    if (user && !user.encryptedPassword) {
      throw Unauthorized("소셜 로그인으로 가입한 계정입니다. 구글 로그인을 이용해주세요.");
    }
    if (!user || !(await comparePassword(password, user.encryptedPassword))) {
      throw Unauthorized("이메일 또는 비밀번호가 올바르지 않습니다.");
    }

    const tokens = await issueTokens(user.id);
    return { ...tokens, user: serializeUser(user) };
  },

  // 구글 로그인/회원가입
  // - credential : GIS <GoogleLogin> 의 ID 토큰
  // - accessToken: useGoogleLogin(implicit) 의 access 토큰
  async loginWithGoogle({ credential, accessToken }) {
    if (!process.env.GOOGLE_CLIENT_ID) {
      throw new HttpError(503, "구글 로그인이 설정되지 않았습니다. (GOOGLE_CLIENT_ID 미설정)");
    }
    if (!credential && !accessToken) {
      throw BadRequest("구글 인증 정보가 필요합니다.");
    }

    let profile;
    try {
      profile = credential
        ? await verifyGoogleIdToken(credential)
        : await verifyGoogleAccessToken(accessToken);
    } catch {
      throw Unauthorized("구글 인증에 실패했습니다.");
    }
    if (!profile.email || !profile.emailVerified) {
      throw Unauthorized("이메일이 확인되지 않은 구글 계정입니다.");
    }

    let user = await userRepository.findByEmail(profile.email);

    // 신규 → 회원가입
    if (!user) {
      const nickname = await uniqueNickname(profile.name || profile.email.split("@")[0]);
      user = await userRepository.create({
        email: profile.email,
        nickname,
        provider: "google",
        encryptedPassword: null,
        image: profile.picture ?? null,
      });
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
