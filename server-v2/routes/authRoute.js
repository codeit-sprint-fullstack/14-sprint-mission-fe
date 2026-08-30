import express from 'express';
import passport from 'passport';
import authController from '../controllers/authController.js';

const router = express.Router();

router.post('/signUp', authController.createUser); 
router.post('/signIn', authController.getUser);
router.post('/refresh-token', 
  passport.authenticate('refresh-token', { session: false }), 
  authController.refreshToken
);
router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] }) // google에 요청할 사용자 정보
);
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  authController.issueOAuthTokens  // 구글 로그인 후, 우리 서비스 사용을 위한 토큰 발행
);

export default router;