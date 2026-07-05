import "dotenv/config";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';

const app = express();
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

app.use(express.json());

app.get("/articles", async (req, res) => {
  try {
    console.log("✅ /articles 라우트 호출됨");
    const articles = await prisma.article.findMany();
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Articles를 가져오는데 실패했습니다."});
  }
});

app.get("/articles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const article = await prisma.article.findUnique({
      where: { id },
      include: { comments: true },
    });

    if (!article) {
      return res.status(404).json({ error: "해당하는 Article이 없습니다."});
    }

    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Article를 가져오는데 실패했습니다."})
  }
})


app.listen(3000, () => console.log('✅ DB 서버가 3000번 포트에서 실행될 예정입니다'));


