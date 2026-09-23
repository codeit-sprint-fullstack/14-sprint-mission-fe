import { Prisma } from "@prisma/client";
import fs from "fs";
import multer from "multer";

function removeUploadedFiles(files) {
  for (const file of files ?? []) {
    fs.unlink(file.path, () => {});
  }
}

export default function errorHandler(err, req, res, next) {
  removeUploadedFiles(req.files);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: "이미지는 최대 3개까지 등록할 수 있습니다.",
    });
  }

  if (
    err.name === "StructError" ||
    err instanceof Prisma.PrismaClientValidationError
  ) {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    return res.status(409).json({
      message: "이미 존재하는 데이터입니다.",
    });
  }

  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2025"
  ) {
    return res.status(404).json({
      message: "데이터를 찾을 수 없습니다.",
    });
  }

  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2003"
  ) {
    return res.status(404).json({
      message: "연결할 데이터를 찾을 수 없습니다.",
    });
  }

  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  console.error(err);

  res.status(500).json({
    message: "서버 오류가 발생했습니다.",
  });
}
