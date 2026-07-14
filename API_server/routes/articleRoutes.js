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

function validateArticleInput({
  title,
  content,
}) {
  const errors = [];

  if (
    typeof title !== "string" ||
    title.trim().length === 0
  ) {
    errors.push("제목을 입력해주세요.");
  }

  if (
    typeof content !== "string" ||
    content.trim().length === 0
  ) {
    errors.push("내용을 입력해주세요.");
  }

  return errors;
}

// ==============================================================
// 게시글 목록 조회
// ==============================================================
router.get("/", async (req, res) => {
  try {
    const {
      cursor,
      limit,
    } = req.query;

    const numericCursor = cursor === undefined
      ? null
      : parsePositiveInteger(cursor);

    const numericLimit = parsePositiveInteger(limit, 10);

    if (
      numericCursor === null && cursor !== undefined
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

    const articles = await prisma.article.findMany({
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
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const hasNextPage = articles.length > numericLimit;
    const list = hasNextPage
      ? articles.slice(0, numericLimit)
      : articles;

    const nextCursor = hasNextPage
      ? list[list.length - 1].id
      : null;

    res.status(200).json({
      list,
      nextCursor,
    });
  } catch (error) {
    res.status(500).json({
      message: "게시글 목록 조회에 실패했습니다.",
      error: error.message,
    });
  }
});

// ==============================================================
// 게시글 등록
// ==============================================================
router.post("/", async (req, res) => {
  try {
    const {
      title,
      content,
    } = req.body;

    const articleData = {
      title,
      content,
    };

    const errors = validateArticleInput(articleData);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "게시글 등록 데이터가 올바르지 않습니다.",
        errors,
      });
    }

    const article = await prisma.article.create({
      data: {
        title: title.trim(),
        content: content.trim(),
      },
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({
      message: "게시글 등록에 실패했습니다.",
      error: error.message,
    });
  }
});

// ==============================================================
// 게시글 상세 조회
// ==============================================================
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (
      Number.isNaN(id) ||
      !Number.isInteger(id) ||
      id < 1
    ) {
      return res.status(400).json({
        message: "올바르지 않은 게시글 ID입니다.",
      });
    }

    const article = await prisma.article.findUnique({
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

    if (!article) {
      return res.status(404).json({
        message: "게시글을 찾을 수 없습니다.",
      });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({
      message: "게시글 조회에 실패했습니다.",
      error: error.message,
    });
  }
});

// ==============================================================
// 게시글 수정
// ==============================================================
router.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (
      Number.isNaN(id) ||
      !Number.isInteger(id) ||
      id < 1
    ) {
      return res.status(400).json({
        message: "올바르지 않은 게시글 ID입니다.",
      });
    }

    const existingArticle = await prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!existingArticle) {
      return res.status(404).json({
        message: "게시글을 찾을 수 없습니다.",
      });
    }

    const updateData = {};

    if (req.body.title !== undefined) {
      updateData.title = req.body.title;
    }

    if (req.body.content !== undefined) {
      updateData.content = req.body.content;
    }

    const mergedArticle = {
      title: updateData.title ?? existingArticle.title,
      content: updateData.content ?? existingArticle.content,
    };

    const errors = validateArticleInput(mergedArticle);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "게시글 수정 데이터가 올바르지 않습니다.",
        errors,
      });
    }

    if (updateData.title !== undefined) {
      updateData.title = updateData.title.trim();
    }

    if (updateData.content !== undefined) {
      updateData.content = updateData.content.trim();
    }

    const updatedArticle = await prisma.article.update({
      where: {
        id,
      },
      data: updateData,
    });

    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({
      message: "게시글 수정에 실패했습니다.",
      error: error.message,
    });
  }
});

// ==============================================================
// 게시글 삭제
// ==============================================================
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (
      Number.isNaN(id) ||
      !Number.isInteger(id) ||
      id < 1
    ) {
      return res.status(400).json({
        message: "올바르지 않은 게시글 ID입니다.",
      });
    }

    const existingArticle = await prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!existingArticle) {
      return res.status(404).json({
        message: "게시글을 찾을 수 없습니다.",
      });
    }

    await prisma.article.delete({
      where: {
        id,
      },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "게시글 삭제에 실패했습니다.",
      error: error.message,
    });
  }
});

export default router;