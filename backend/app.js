import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
dotenv.config();

import express from "express";
import cors from "cors";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import productsRouter from "./routes/products.js";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});


// 게시글 목록 조회 API
app.get("/api/articles", async (req, res) => {
  try {
    const { orderBy = "recent", keyword = "" } = req.query;

    const articles = await prisma.article.findMany({
      where: {
        title: {
          contains: keyword,
          mode: "insensitive",
        },
      },
      orderBy:
        orderBy === "like"
          ? { likeCount: "desc" }
          : { createdAt: "desc" },
    });

    res.send(articles);
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "게시글 목록을 불러오지 못했습니다.",
    });
  }
});

// Best
app.get("/api/articles/best", async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        likeCount: "desc",
      },
      take: 3,
    });

    res.send(articles);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "베스트 게시글을 불러오지 못했습니다.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

