import { Prisma } from "@prisma/client";
import cors from "cors";
import "dotenv/config";
import express from "express";
import articlesRouter from "./routes/articles.js";
import authRouter from "./routes/auth.js";
import commentsRouter from "./routes/comments.js";
import productsRouter from "./routes/products.js";
import usersRouter from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Panda Market API server is running.");
});

app.use("/products", productsRouter);
app.use("/articles", articlesRouter);
app.use("/comments", commentsRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.use((err, req, res, next) => {
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
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
