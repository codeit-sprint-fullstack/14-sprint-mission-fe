import express from "express";
import cors from "cors";
import "dotenv/config";
import { Prisma } from "@prisma/client";
import productsRouter from "./routes/products.js";
import articlesRouter from "./routes/articles.js";
import commentsRouter from "./routes/comments.js";

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

  console.error(err);

  res.status(500).json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
