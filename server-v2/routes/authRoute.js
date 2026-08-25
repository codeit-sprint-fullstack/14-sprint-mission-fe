import express from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signUp', authController.createUser); // 회원가입
router.post('/signIn', authController.getUser); // 로그인
router.post('/refresh-token', authMiddleware.verifyRefreshToken, authController.refreshToken); // 토큰 refresh

export default router;