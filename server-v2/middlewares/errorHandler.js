// 에러 핸들러 - 실습 예제 참고

const PRISMA_ERROR_STATUS = {
  P2002: 409,  // unique 제약 위반
  P2003: 400,  // 참조하는 데이터 없음
  P2025: 404,  // 대상 레코드 없음
}

function resolveStatus(error) {
  if (typeof error.code === 'number') return error.code;
  if (error.name === 'StructError') return 400; // superStruct 유효성 검사
  if (PRISMA_ERROR_STATUS[error.code]) return PRISMA_ERROR_STATUS[error.code];
  return error.status ?? 500;
}

export default function errorHandler(error, req, res, next) {
  const status = resolveStatus(error);
  console.error(error);
  return res.status(status).json({ 
    message: status === 500 ? 'Internal Server Error' : error.message,
  })
}