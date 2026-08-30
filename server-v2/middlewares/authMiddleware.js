import { expressjwt } from 'express-jwt';

// 인가된 사용자 확인을 위한 AT 검증 미들웨어 
// authrization header로부터 전달받음(기본값)
const verifyAccessToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'user', // 페이로드 정보를 req.user에 저장(기본값 req.auth)
});

// AT refresh를 위한 RT 검증 미들웨어
// req.body로부터 전달받음(경로 수정 필요)
const verifyRefreshToken = expressjwt({
  getToken: (req) => req.body.refreshToken,
  secret: process.env.JWT_REFRESH_SECRET,
  algorithms: ['HS256'],
});

export default {
  verifyAccessToken,
  verifyRefreshToken,
}