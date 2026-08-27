import express from "express";
import {
  createArticleController,
  deleteArticleController,
  getArticlesController,
  updateArticleController,
} from "../controllers/articleController.js";
import prisma from "../lib/prisma.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .get(auth.optionalAccessToken, getArticlesController)
  .post(auth.verifyAccessToken, createArticleController);

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

router.patch("/:id", auth.verifyAccessToken, updateArticleController);

router.delete("/:id", auth.verifyAccessToken, deleteArticleController);

router.post("/:articleId/comments", async (req, res) => {
  const { articleId } = req.params;
  const { content } = req.body;

  const comment = await prisma.comment.create({
    data: {
      content,
      articleId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      articleId: true,
    },
  });

  res.status(201).json(comment);
});

router.get("/:articleId/comments", async (req, res) => {
  const { articleId } = req.params;
  const { cursor } = req.query;
  const limit = Number(req.query.limit) || 10;

  const queryOptions = {
    where: {
      articleId,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: cursor ? 1 : 0,
    take: limit,
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  };

  if (cursor) {
    queryOptions.cursor = {
      id: cursor,
    };
  }

  const comments = await prisma.comment.findMany(queryOptions);

  const nextCursor =
    comments.length === limit ? comments[comments.length - 1].id : null;

  res.status(200).json({
    list: comments,
    nextCursor,
  });
});

export default router;
