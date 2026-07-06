import "dotenv/config";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import { parse } from "dotenv";

const app = express();
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

app.use(express.json());

// Articles 메서드

app.get("/articles", async (req, res) => {
  try {
    
    console.log("✅ /articles 라우트 호출됨");
    
    const { title, content, from, to, page = 1, limit = 10, sort = "createdAt", order = "desc" } = req.query;

    const where = {};

    if (title) {
      where.title = {
        contains: title,
        mode: "insensitive",
      };
    }

    if (content) {
      where.content = {
        contains: content,
        mode: "insensitive",
      };
    }

    if (from || to) {
      where.createdAt = {};
      if(from) {
        where.createdAt.gte = new Date(from);
      }
      if (to) {
        where.createdAt.lte = new Date(to);
      }
    }

    const articles = await prisma.article.findMany({
      where,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      orderBy: { [sort]: order },
    });

    const totalCount = await prisma.article.count({where});

    if (articles.length === 0) {
      return res.status(404).json({ error: "조건에 맞는 Article이 없습니다." });
    }

    return res.json({
      totalCount,
      page: parseInt(page),
      limit: parseInt(limit),
      articles,
    });

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

app.post("/articles", async (req, res) => {
  try {
    const { title, content } = req.body;

    if ( !title || !content ) {
      return res.status(400).json({ error: "title과 content 값이 없습니다."});
    }

    const newArticle = await prisma.article.create({
      data: {
        title,
        content,
      },
    });

    res.status(201).json(newArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Article을 생성하는데 실패했습니다." });
  }
});

app.patch("/articles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "수정할 데이터가 필요합니다." });
    }

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: updateData,
    });

    res.json(updatedArticle);
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "해당하는 Article을 찾을 수 없습니다." });
    }

    res.status(500).json({ error: "Article 수정에 실패했습니다." });
  }
});

app.delete("/articles/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedArticle = await prisma.article.delete({
      where: { id },
    });

    res.json({ message: "Article이 삭제되었습니다.", deletedArticle});
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "해당 Article을 찾을 수 없습니다." });
    }

    res.status(500).json({ error: "Article 삭제에 실패했습니다." });
  }
});

// Comment 메서드
app.get("/articles/:id/comment", async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await prisma.comment.findMany({
      where: { articleId: id },
      orderBy: { createdAt: "desc" },
    });

    if (comments.length === 0) {
      return res.status(404).json({ error: "해당 Article에 Comment가 없습니다." });
    }

    res.json(comments);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Comment를 가져오는데 실패했습니다." });
  }
});

app.listen(3000, () => console.log('✅ DB 서버가 3000번 포트에서 실행될 예정입니다'));


