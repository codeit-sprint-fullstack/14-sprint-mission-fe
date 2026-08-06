function notFound(_req, _res, next) {
  const error = new Error('요청한 API를 찾을 수 없습니다.');
  error.status = 404;
  next(error);
}

export default notFound;
