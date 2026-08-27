import express from "express";
import { Prisma } from "@prisma/client";
import prisma from "../src/lib/prisma.js";
import {
  hashPassword,
  comparePassword,
  generateTokens,
  verifyRefreshToken,
  toPublicUser,
} from "../src/lib/auth.js";

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 회원가입
router.post("/signUp", async (req, res, next) => {
  try {
    const { email, nickname, password, passwordConfirmation } = req.body;

    if (!email || !nickname || !password) {
      return next({ status: 400, message: "이메일, 닉네임, 비밀번호는 필수입니다." });
    }
    if (!EMAIL_RE.test(email)) {
      return next({ status: 400, message: "이메일 형식이 올바르지 않습니다." });
    }
    if (password.length < 8) {
      return next({ status: 400, message: "비밀번호는 8자 이상이어야 합니다." });
    }
    if (passwordConfirmation !== undefined && password !== passwordConfirmation) {
      return next({ status: 400, message: "비밀번호가 일치하지 않습니다." });
    }

    const user = await prisma.user.create({
      data: { email, nickname, encryptedPassword: await hashPassword(password) },
    });

    const { accessToken, refreshToken } = generateTokens(user.id);
    await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

    res.status(201).json({ accessToken, refreshToken, user: toPublicUser(user) });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      const field = err.meta?.target?.[0] === "nickname" ? "닉네임" : "이메일";
      return next({ status: 422, message: `이미 사용 중인 ${field} 입니다.` });
    }
    next(err);
  }
});

// 로그인
router.post("/signIn", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next({ status: 400, message: "이메일과 비밀번호를 입력해주세요." });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await comparePassword(password, user.encryptedPassword))) {
      return next({ status: 401, message: "이메일 또는 비밀번호가 올바르지 않습니다." });
    }

    const { accessToken, refreshToken } = generateTokens(user.id);
    await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

    res.json({ accessToken, refreshToken, user: toPublicUser(user) });
  } catch (err) {
    next(err);
  }
});

// 토큰 재발급
router.post("/refresh-token", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return next({ status: 400, message: "refreshToken 이 필요합니다." });
    }

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      return next({ status: 401, message: "유효하지 않은 refreshToken 입니다." });
    }

    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user || user.refreshToken !== refreshToken) {
      return next({ status: 401, message: "유효하지 않은 refreshToken 입니다." });
    }

    const tokens = generateTokens(user.id);
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    res.json(tokens);
  } catch (err) {
    next(err);
  }
});

export default router;
