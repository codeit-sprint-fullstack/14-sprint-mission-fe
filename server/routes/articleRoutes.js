import express from "express";
import prisma from "../lib/prisma.js";
import {
  validateCreateArticleBody,
  validateUpdateArticleBody,
} from "../validators/articleValidator.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { offset, limit, keyword, sort } = req.query;

    const offsetNum = Number(offset) || 0;
    const limitNum = Number(limit) || 10;

    const where = keyword
      ? {
          OR: [
            // 제목이나 본문에 keyword가 포함되어있는지 찾겠다
            { title: { contains: keyword, mode: "insensitive" } },
            { content: { contains: keyword, mode: "insensitive" } },
          ],
        }
      : {};

    const totalCount = await prisma.article.count({ where });
    const articles = await prisma.article.findMany({
      where,
      orderBy: sort === "recent" ? { createdAt: "desc" } : { createdAt: "asc" },
      skip: offsetNum,
      take: limitNum,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });

    res.json({
      list: articles,
      totalCount,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      return res.status(404).json({
        message: "게시글을 찾을 수 없습니다.",
      });
    }
    res.json(article);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = validateCreateArticleBody(req.body);

    const article = await prisma.article.create({
      data,
    });

    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });
    if (!existingArticle) {
      return res.status(404).json({
        message: "게시글을 찾을 수 없습니다.",
      });
    }

    const data = validateUpdateArticleBody(req.body);

    const article = await prisma.article.update({
      where: { id },
      data,
    });

    res.json(article);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return res.status(404).json({
        message: "게시글을 찾을 수 없습니다.",
      });
    }

    await prisma.article.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
export default router;
