import express from "express";
import prisma from "../lib/prisma.js";
import {
  validateCreateCommentBody,
  validateUpdateCommentBody,
} from "../validators/commentValidator.js";

const router = express.Router();

router.post("/products/:productId/comments", async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을수 없습니다.",
      });
    }

    const data = validateCreateCommentBody(req.body);

    const comment = await prisma.comment.create({
      data: {
        ...data,
        productId,
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

router.post("/articles/:articleId/comments", async (req, res, next) => {
  try {
    const { articleId } = req.params;

    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });
    if (!article) {
      return res.status(404).json({
        message: "게시글을 찾을 수 없습니다.",
      });
    }

    const data = validateCreateCommentBody(req.body);

    const comment = await prisma.comment.create({
      data: {
        ...data,
        articleId,
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

router.get("/products/:productId/comments", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { cursor, limit } = req.query;

    const limitNum = Number(limit) || 10;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    const comments = await prisma.comment.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
      take: limitNum,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    res.json(comments);
  } catch (error) {
    next(error);
  }
});

router.get("/articles/:articleId/comments", async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { cursor, limit } = req.query;

    const limitNum = Number(limit) || 10;

    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });
    if (!article) {
      return res.status(404).json({
        message: "게시글을 찾을 수 없습니다.",
      });
    }

    const comments = await prisma.comment.findMany({
      where: { articleId },
      orderBy: { createdAt: "desc" },
      take: limitNum,
      ...(cursor && {
        //...(스프레드) 조건문이 객체일때, 객체 값이 있으면 객체내용이 바로 보이게 펼침
        cursor: { id: cursor },
        skip: 1,
      }),
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    res.json(comments);
  } catch (error) {
    next(error);
  }
});

router.patch("/comments/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingComment = await prisma.comment.findUnique({
      where: { id },
    });
    if (!existingComment) {
      return res.status(404).json({
        message: "댓글을 찾을 수 없습니다.",
      });
    }

    const data = validateUpdateCommentBody(req.body);

    const comment = await prisma.comment.update({
      where: { id },
      data,
    });

    res.json(comment);
  } catch (error) {
    next(error);
  }
});

router.delete("/comments/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingComment = await prisma.comment.findUnique({
      where: { id },
    });
    if (!existingComment) {
      return res.status(404).json({
        message: "댓글을 찾을 수 없습니다.",
      });
    }

    await prisma.comment.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
export default router;
