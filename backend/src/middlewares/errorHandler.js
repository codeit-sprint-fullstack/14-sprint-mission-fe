export default function errorHandler(error, req, res, next) {
  if (error.name === "UnauthorizedError") {
    let message = "유효하지 않은 액세스 토큰입니다.";

    if (error.code === "credentials_required") {
      message = "로그인이 필요합니다.";
    } else if (
      error.code === "invalid_token" &&
      error.inner?.name === "TokenExpiredError"
    ) {
      message = "액세스 토큰이 만료되었습니다.";
    }

    return res.status(401).json({
      message,
    });
  }

  const statusCode = error.statusCode ?? 500;

  const message =
    statusCode >= 500 ? "서버 내부 오류가 발생했습니다." : error.message;

  if (statusCode >= 500) {
    console.error(error);
  }

  return res.status(statusCode).json({
    message,
  });
}
