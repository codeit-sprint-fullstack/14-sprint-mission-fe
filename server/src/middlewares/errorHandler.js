import { Prisma } from "@prisma/client";

export default function errorHandler(err, req, res, next) {
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
