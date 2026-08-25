import express from "express";
import auth from "../middlewares/auth.js";
import { getUserById } from "../services/userService.js";

const router = express.Router();

router.get("/me", auth.verifyAccessToken, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        message: "사용자를 찾을 수 없습니다.",
      });
    }

    return res.json(user);
  } catch (error) {
    return next(error);
  }
});

export default router;
