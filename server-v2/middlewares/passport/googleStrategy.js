import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import authService from '../../services/authService.js';

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback', // 구글 로그인 끝나고, 우리 서비스 어떤 주소로 돌아올지 설정
  },
  async function (accessToken, refreshToken, profile, done) {
    try { 
      const user = await authService.upsertOAuthUser(
        profile.provider,
        profile.id,
        profile.emails?.[0]?.value,
        profile.displayName,
      );
      done(null, user);
    } catch (error) {
      done(error);
    }
  },
)

export default googleStrategy;