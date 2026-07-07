import express from "express";

import prisma from "../lib/prisma.js";

const router = express.Router();

function parsePositiveInteger(value, defaultValue) {
  if (value === undefined) {
    return defaultValue;
  }

  const numberValue = Number(value);

  if (
    Number.isNaN(numberValue) ||
    !Number.isInteger(numberValue) ||
    numberValue < 1
  ) {
    return null;
  }

  return numberValue;
}

function validateCommentInput(content) {
  if (
    typeof content !== "string" ||
    content.trim().length === 0
  ) {
    return "댓글 내용을 입력해주세요.";
  }

  return "";
}

// ==============================================================
// 중고마켓 댓글 목록 조회
// ==============================================================
router.get("/products/:productId/comments", async (req, res) => {
  try {
    const productId = Number(req.params.productId);

    if (
      Number.isNaN(productId) ||
      !Number.isInteger(productId) ||
      productId < 1
    ) {
      return res.status(400).json({
        message: "올바르지 않은 상품 ID입니다.",
      });
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    const {
      cursor,
      limit,
    } = req.query;

    const numericCursor = cursor === undefined
      ? null
      : parsePositiveInteger(cursor);

    const numericLimit = parsePositiveInteger(limit, 10);

    if (
      numericCursor === null &&
      cursor !== undefined
    ) {
      return res.status(400).json({
        message: "cursor는 올바른 숫자여야 합니다.",
      });
    }

    if (numericLimit === null) {
      return res.status(400).json({
        message: "limit은 올바른 숫자여야 합니다.",
      });
    }

    const comments = await prisma.productComment.findMany({
      where: {
        productId,
      },
      take: numericLimit + 1,
      skip: numericCursor ? 1 : 0,
      cursor: numericCursor
        ? {
            id: numericCursor,
          }
        : undefined,
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    const hasNextPage = comments.length > numericLimit;

    const list = hasNextPage
      ? comments.slice(0, numericLimit)
      : comments;

    const nextCursor = hasNextPage
      ? list[list.length - 1].id
      : null;

    res.status(200).json({
      list,
      nextCursor,
    });
  } catch (error) {
    res.status(500).json({
      message: "중고마켓 댓글 목록 조회에 실패했습니다.",
      error: error.message,
    });
  }
});

// ==============================================================
// 중고마켓 댓글 등록
// ==============================================================
router.post("/products/:productId/comments", async (req, res) => {
  try {
    const productId = Number(req.params.productId);

    if (
      Number.isNaN(productId) ||
      !Number.isInteger(productId) ||
      productId < 1
    ) {
      return res.status(400).json({
        message: "올바르지 않은 상품 ID입니다.",
      });
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }

    const { content } = req.body;

    const errorMessage = validateCommentInput(content);

    if (errorMessage) {
      return res.status(400).json({
        message: errorMessage,
      });
    }

    const comment = await prisma.productComment.create({
      data: {
        content: content.trim(),
        productId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
      message: "중고마켓 댓글 등록에 실패했습니다.",
      error: error.message,
    });
  }
});

// ==============================================================
// 중고마켓 댓글 수정
// ==============================================================
router.patch("/product-comments/:commentId", async (req, res) => {
  try {
    const commentId = Number(req.params.commentId);

    if (
      Number.isNaN(commentId) ||
      !Number.isInteger(commentId) ||
      commentId < 1
    ) {
      return res.status(400).json({
        message: "올바르지 않은 댓글 ID입니다.",
      });
    }

    const existingComment = await prisma.productComment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!existingComment) {
      return res.status(404).json({
        message: "댓글을 찾을 수 없습니다.",
      });
    }

    const { content } = req.body;

    const errorMessage = validateCommentInput(content);

    if (errorMessage) {
      return res.status(400).json({
        message: errorMessage,
      });
    }

    const updatedComment = await prisma.productComment.update({
      where: {
        id: commentId,
      },
      data: {
        content: content.trim(),
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({
      message: "중고마켓 댓글 수정에 실패했습니다.",
      error: error.message,
    });
  }
});

// ==============================================================
// 중고마켓 댓글 삭제
// ==============================================================
router.delete("/product-comments/:commentId", async (req, res) => {
  try {
    const commentId = Number(req.params.commentId);

    if (
      Number.isNaN(commentId) ||
      !Number.isInteger(commentId) ||
      commentId < 1
    ) {
      return res.status(400).json({
        message: "올바르지 않은 댓글 ID입니다.",
      });
    }

    const existingComment = await prisma.productComment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!existingComment) {
      return res.status(404).json({
        message: "댓글을 찾을 수 없습니다.",
      });
    }

    await prisma.productComment.delete({
      where: {
        id: commentId,
      },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "중고마켓 댓글 삭제에 실패했습니다.",
      error: error.message,
    });
  }
});

export default router;