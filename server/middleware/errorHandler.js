function getDatabaseErrorMessage(error) {
  if (error.code === '23505') {
    return '이미 존재하는 데이터입니다.';
  }

  if (error.code === '23503') {
    return '연결된 데이터를 찾을 수 없습니다.';
  }

  if (error.code === '23502' || error.code === '23514' || error.code === '22P02') {
    return '요청 값이 올바르지 않습니다.';
  }

  return null;
}

function errorHandler(error, _req, res, _next) {
  const databaseMessage = getDatabaseErrorMessage(error);

  if (databaseMessage) {
    return res.status(400).json({ message: databaseMessage });
  }

  const status = error.status || 500;
  const message = status === 500 ? '서버 오류가 발생했습니다.' : error.message;

  return res.status(status).json({ message });
}

export default errorHandler;
