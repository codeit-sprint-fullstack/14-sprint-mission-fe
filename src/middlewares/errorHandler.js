// 전역 에러 핸들러 — HttpError(및 { status, message }) 를 응답으로 변환
export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "서버 오류가 발생했습니다.";
  if (status >= 500) console.error(err);
  res.status(status).json({ message });
}

// 라우트에 매칭되지 않은 요청
export function notFoundHandler(req, res) {
  res.status(404).json({ message: `${req.method} ${req.originalUrl} 경로를 찾을 수 없습니다.` });
}
