import { asyncHandler } from "../utils/http.js";
import { authService } from "../services/auth.service.js";

export const authController = {
  signUp: asyncHandler(async (req, res) => {
    const result = await authService.signUp(req.body);
    res.status(201).json(result);
  }),

  signIn: asyncHandler(async (req, res) => {
    const result = await authService.signIn(req.body);
    res.json(result);
  }),

  google: asyncHandler(async (req, res) => {
    // GIS 는 credential, 다른 라이브러리는 idToken 으로 넘길 수 있어 둘 다 허용
    const result = await authService.loginWithGoogle(req.body.credential ?? req.body.idToken);
    res.json(result);
  }),

  refresh: asyncHandler(async (req, res) => {
    const tokens = await authService.refresh(req.body.refreshToken);
    res.json(tokens);
  }),
};
