import express from "express";
import multer from "multer";
import path from "path";
import { BadRequest } from "../src/errors/HttpError.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

const router = express.Router();

// 이미지 업로드 — 프론트가 <img src> 로 바로 쓸 수 있도록 절대 URL 로 반환한다.
// (파일은 이 서버(:4000)의 /uploads 에서 서빙되고, 프론트는 :3000 이라 상대경로면 못 찾음)
router.post("/upload", upload.single("image"), (req, res, next) => {
  if (!req.file) return next(BadRequest("이미지가 업로드되지 않았습니다."));

  const baseUrl = process.env.SERVER_PUBLIC_URL || `${req.protocol}://${req.get("host")}`;
  res.json({ url: `${baseUrl}/uploads/${req.file.filename}` });
});

export default router;
