// passport 설정
import passport from 'passport';
import { accessTokenStrategy, refreshTokenStrategy } from '../middlewares/passport/jwtStrategy.js';
import googleStrategy from '../middlewares/passport/googleStrategy.js';

// 구현한 전략 등록
passport.use('access-token', accessTokenStrategy);
passport.use('refresh-token', refreshTokenStrategy);
passport.use('google', googleStrategy);

export default passport;