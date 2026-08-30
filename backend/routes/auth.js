import express from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// 회원가입
router.post("/signup", async (req, res) => {
  const { email, nickname, password } = req.body;

  // 이미 가입된 이메일인지 확인
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return res.status(409).send({
      message: "이미 사용 중인 이메일입니다.",
    });
  }

  // 비밀번호 암호화
  const encryptedPassword = await bcrypt.hash(password, 10);

  // User DB에 저장
  const user = await prisma.user.create({
    data: {
      email,
      nickname,
      encryptedPassword,
    },
  });

  // 응답에서는 암호화된 비밀번호 제외
  const { encryptedPassword: _, ...userWithoutPassword } = user;

  // 회원가입 성공
  res.status(201).send(userWithoutPassword);
});

// 로그인
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 이메일로 유저 찾기
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // 가입된 유저가 없는 경우
  if (!user) {
    return res.status(401).send({
      message: "가입된 정보가 없습니다.",
    });
  }

  // 비밀번호 확인
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.encryptedPassword
  );

  if (!isPasswordCorrect) {
    return res.status(401).send({
      message: "비밀번호가 일치하지 않습니다.",
    });
  }

  // JWT 발급
  const accessToken = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET
  );

  // 로그인 성공
  res.status(200).send({
    accessToken,
  });
});

export default router;