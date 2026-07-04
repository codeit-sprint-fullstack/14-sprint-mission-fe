import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { offset, limit, keyword, sort } = req.query;

    const offsetNum = Number(offset) || 0;
    const limitNum = Number(limit) || 10;

    const where = keyword
      ? {
          OR: [
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
    console.error(error);

    res.status(500).json({
      message: "게시글 목록 조회에 실패했습니다.",
    });
  }
});

router.get("/:id", async (req, res) => {
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
    console.error(error);

    res.status(500).json({
      message: "게시글 상세 조회에 실패했습니다.",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const article = await prisma.article.create({ data: req.body });

    res.status(201).json(article);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "게시글 등록에 실패했습니다.",
    });
  }
});

router.patch("/:id", async (req, res) => {
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

    const article = await prisma.article.update({
      where: { id },
      data: req.body,
    });

    res.json(article);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "게시글 수정에 실패했습니다.",
    });
  }
});

router.delete("/:id", async (req, res) => {
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
    console.error(error);

    res.status(500).json({
      message: "게시글 삭제에 실패했습니다.",
    });
  }
});
export default router;
