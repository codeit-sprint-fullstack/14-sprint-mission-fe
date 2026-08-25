import { assert } from 'superstruct';
import authService from '../services/authService.js';
import authStruct from '../structs/authStruct.js';

// 회원가입
async function createUser(req, res, next) {
  try {
    assert(req.body, authStruct.createUser); // superStruct 유효성 검사
    const user = await authService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

// 로그인
async function getUser(req, res, next) {
  try {
    assert(req.body, authStruct.getUser); // superStruct 유효성 검사
    const { email, password } = req.body;
    const user = await authService.getUser(email, password); // 로그인
    const accessToken = authService.createToken(user, 'access'); // 로그인 성공시 AT 생성
    const refreshToken = authService.createToken(user, 'refresh') // RT 생성
    await authService.updateRefreshToken(user.id, refreshToken); // DB에 RT 저장
    return res.json({
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    next(error);
  }
}

// 토큰 refresh
async function refreshToken(req, res, next) {
  try {
    const { userId } = req.auth;
    const { refreshToken } = req.body;
    const { accessToken, newRefreshToken } = await authService.refreshToken(userId, refreshToken); // AT, RT refresh (슬라이딩)
    await authService.updateRefreshToken(userId, newRefreshToken); // 새 RT DB에 저장
    return res.json({ 
      accessToken,
      refreshToken: newRefreshToken, 
    });
  } catch (error) {
    next(error);
  }
}

export default {
  createUser,
  getUser,
  refreshToken,
}