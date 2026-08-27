import { verifyAccessToken } from "../lib/auth.js";

// 토큰이 있으면 req.userId 를 세팅하고, 없거나 무효여도 통과시킨다.
// 공개 조회(GET)에서 "로그인했다면 isFavorite 계산" 용도.
export function softAuthenticate(req, res, next) {
  const [scheme, token] = (req.headers.authorization || "").split(" ");
  if (scheme === "Bearer" && token) {
    try {
      req.userId = verifyAccessToken(token).userId;
    } catch {
      // 무시
    }
  }
  next();
}

// Authorization: Bearer <accessToken> 검증 → req.userId 세팅
export function authenticate(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next({ status: 401, message: "인증 토큰이 필요합니다." });
  }

  try {
    const payload = verifyAccessToken(token);
    req.userId = payload.userId;
    next();
  } catch (err) {
    const message =
      err.name === "TokenExpiredError"
        ? "토큰이 만료되었습니다."
        : "유효하지 않은 토큰입니다.";
    next({ status: 401, message });
  }
}
