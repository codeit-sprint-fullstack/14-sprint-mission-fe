// 에러 핸들러 - 실습 예제 참고

const PRISMA_ERROR_STATUS = {
  P2002: 409,  // unique 제약 위반
  P2003: 400,  // 참조하는 데이터 없음
  P2025: 404,  // 대상 레코드 없음
}

function resolveStatus(error) {
  // 서비스에서 지정한 HTTP 상태 코드
  if (typeof error.code === 'number') {
    return error.code;
  }

  // superStruct 유효성 검사 에러
  if (error.name === 'StructError') {
    return 400;
  }

  // multer 파일 업로드 에러
  if (error.name === 'MulterError') {
    if (error.code === 'LIMIT_FILE_SIZE') return 413;
    return 400;
  }

  // prisma 에러
  if (PRISMA_ERROR_STATUS[error.code]) {
    return PRISMA_ERROR_STATUS[error.code];
  }

  // 그 외 에러는 서버 에러로 처리
  return error.status ?? 500;
}

export default function errorHandler(error, req, res, next) {
  const status = resolveStatus(error);
  console.error(error);
  return res.status(status).json({ 
    message: status === 500 ? 'Internal Server Error' : error.message,
  })
}