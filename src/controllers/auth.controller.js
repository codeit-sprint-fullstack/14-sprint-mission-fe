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
    const result = await authService.loginWithGoogle({
      credential: req.body.credential ?? req.body.idToken,
      accessToken: req.body.accessToken,
    });
    res.json(result);
  }),

  refresh: asyncHandler(async (req, res) => {
    const tokens = await authService.refresh(req.body.refreshToken);
    res.json(tokens);
  }),
};
