import express from "express";
import prisma from "../src/lib/prisma.js";
import { authenticate } from "../src/middlewares/authenticate.js";
import { toPublicUser } from "../src/lib/auth.js";

const router = express.Router();

// 내 정보 조회
router.get("/me", authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) {
      return next({ status: 404, message: "유저를 찾을 수 없습니다." });
    }
    res.json(toPublicUser(user));
  } catch (err) {
    next(err);
  }
});

// 내 정보 수정 (닉네임 / 이미지)
router.patch("/me", authenticate, async (req, res, next) => {
  try {
    const { nickname, image } = req.body;

    const data = {};
    if (nickname !== undefined) data.nickname = nickname;
    if (image !== undefined) data.image = image;

    const user = await prisma.user.update({
      where: { id: req.userId },
      data,
    });

    res.json(toPublicUser(user));
  } catch (err) {
    if (err.code === "P2002") {
      return next({ status: 422, message: "이미 사용 중인 닉네임 입니다." });
    }
    next(err);
  }
});

export default router;
