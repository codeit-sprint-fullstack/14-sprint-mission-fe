export default function errorHandler(error, req, res, next) {
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
