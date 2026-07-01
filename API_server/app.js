import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

app.get("/", (req, res) => {
  res.send("중고마켓 API 서버가 실행 중입니다.");
});

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("MongoDB 연결 성공");

    app.listen(PORT, () => {
      console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
    });
  })
  .catch((error) => {
    console.error("MongoDB 연결 실패:", error);
  });