import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, content } = req.body;

  const article = await prisma.article.create({
    data: {
      title,
      content,
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.status(201).json(article);
});

router.get("/", async (req, res) => {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;
  const keyword = req.query.keyword || "";

  const where = keyword
    ? {
        OR: [
          {
            title: {
              contains: keyword,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: keyword,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  const totalCount = await prisma.article.count({
    where,
  });

  const articles = await prisma.article.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    skip: offset,
    take: limit,
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
  });

  res.status(200).json({
    list: articles,
    totalCount,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const article = await prisma.article.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.status(200).json(article);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  const updatedArticle = await prisma.article.update({
    where: {
      id,
    },
    data: req.body,
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.status(200).json(updatedArticle);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    await prisma.article.delete({
      where: {
        id,
      },
    });

    res.sendStatus(204);
});

export default router;
