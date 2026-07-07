import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import articleCommentRoutes from "./routes/articleCommentRoutes.js";
import productCommentRoutes from "./routes/productCommentRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

app.get("/", (req, res) => {
  res.send("API 서버가 실행 중입니다.");
});

app.use("/products", productRoutes);
app.use("/articles", articleRoutes);
app.use("/", articleCommentRoutes);
app.use("/", productCommentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});