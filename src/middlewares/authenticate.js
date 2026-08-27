import { verifyAccessToken } from "../lib/auth.js";
import { userRepository } from "../repositories/user.repository.js";
import { Unauthorized } from "../errors/HttpError.js";

// 토큰이 있고 그 사용자가 실제로 존재하면 req.userId 를 세팅.
// 없거나 무효/삭제된 사용자여도 통과시킨다 (공개 조회에서 isFavorite 계산용).
export async function softAuthenticate(req, res, next) {
  const [scheme, token] = (req.headers.authorization || "").split(" ");
  if (scheme === "Bearer" && token) {
    try {
      const { userId } = verifyAccessToken(token);
      const user = await userRepository.findById(userId);
      if (user) req.userId = user.id;
    } catch {
      // 토큰 무효 → 익명 취급
    }
  }
  next();
}

// Authorization: Bearer <accessToken> 검증 + 사용자 존재 확인 → req.userId 세팅
export async function authenticate(req, res, next) {
  const [scheme, token] = (req.headers.authorization || "").split(" ");
  if (scheme !== "Bearer" || !token) {
    return next(Unauthorized("인증 토큰이 필요합니다."));
  }

  let userId;
  try {
    userId = verifyAccessToken(token).userId;
  } catch (err) {
    const message =
      err.name === "TokenExpiredError" ? "토큰이 만료되었습니다." : "유효하지 않은 토큰입니다.";
    return next(Unauthorized(message));
  }

  try {
    const user = await userRepository.findById(userId);
    if (!user) {
      return next(Unauthorized("존재하지 않는 사용자입니다. 다시 로그인해주세요."));
    }
    req.userId = user.id;
    next();
  } catch (err) {
    next(err); // DB 오류 등은 그대로 전파
  }
}
