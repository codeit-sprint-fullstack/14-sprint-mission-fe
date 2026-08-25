// 토큰 기반 전략
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import authService from '../../services/authService.js';

// AT 검증 (인가된 사용자 확인을 위함)
export const accessTokenStrategy = new JWTStrategy(
  // JWT를 어디에서 가져오고 어떻게 검증할지 설정
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    algorithms: ['HS256'],
  },
  // JWT 검증이 끝난 뒤 실행되는 함수
  // 검증이 끝나면 JWT의 payload를 두번째 함수에 넘겨줌
  // payload의 userId에 해당하는 사용자가 실제로 존재하는지 확인
  async function (payload, done) {
    try {
      // 사용자 정보를 꺼내서 done에 넣기
      const userId = payload.userId;
      const user = await authService.getUserById(userId);
      if (!user) return done (null, false);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  },
)

// RT 검증 (AT refresh를 위함)
export const refreshTokenStrategy = new JWTStrategy(
  // JWT를 어디에서 가져오고 어떻게 검증할지 설정
  {
    jwtFromRequest: (req) => req.body?.refreshToken || null,
    secretOrKey: process.env.JWT_REFRESH_SECRET,
    algorithms: ['HS256'],
  },
  // JWT 검증이 끝난 뒤 실행되는 함수
  async function (payload, done) {
    try { 
      // 사용자 정보를 꺼내서 done에 넣기
      const userId = payload.userId;
      const user = await authService.getUserById(userId);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  },
)