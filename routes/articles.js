import express from "express";
import prisma from "../src/lib/prisma.js";
import { authenticate, softAuthenticate } from "../src/middlewares/authenticate.js";
import { articleWriterSelect, articleLikeInclude, serializeArticle } from "../src/lib/article.js";
import { writerSelect, serializeComment } from "../src/lib/comment.js";

const router = express.Router();

const MAX_IMAGES = 3;

function normalizeImages(images) {
  if (!Array.isArray(images)) return [];
  return images.filter((u) => typeof u === "string" && u.trim()).slice(0, MAX_IMAGES);
}

function validateArticle(req, res, next) {
  const { title, content } = req.body;
  if (!title || !title.trim() || !content || !content.trim()) {
    return next({ status: 400, message: "제목과 내용은 필수입니다." });
  }
  if (Array.isArray(req.body.images) && req.body.images.length > MAX_IMAGES) {
    return next({ status: 400, message: `이미지는 최대 ${MAX_IMAGES}개까지 등록할 수 있습니다.` });
  }
  next();
}

// 게시글 목록 조회 (offset 페이지네이션, 검색, 정렬)
router.get("/", softAuthenticate, async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const pageSize = Math.max(parseInt(req.query.pageSize) || 10, 1);
    const orderBy = req.query.orderBy || "recent";
    const keyword = req.query.keyword || "";

    const where = keyword
      ? {
          OR: [
            { title: { contains: keyword, mode: "insensitive" } },
            { content: { contains: keyword, mode: "insensitive" } },
          ],
        }
      : {};

    const orderByClause =
      orderBy === "like"
        ? [{ likeCount: "desc" }, { id: "desc" }]
        : [{ createdAt: "desc" }, { id: "desc" }];

    const [list, totalCount] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy: orderByClause,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: { ...articleWriterSelect, ...articleLikeInclude(req.userId) },
      }),
      prisma.article.count({ where }),
    ]);

    res.json({ list: list.map((a) => serializeArticle(a)), totalCount });
  } catch (err) {
    next(err);
  }
});

// 게시글 등록 (로그인 필요)
router.post("/", authenticate, validateArticle, async (req, res, next) => {
  try {
    const { title, content, images } = req.body;

    const article = await prisma.article.create({
      data: {
        title,
        content,
        images: normalizeImages(images),
        writerId: req.userId,
      },
      include: articleWriterSelect,
    });

    res.status(201).json(serializeArticle(article, { isLiked: false }));
  } catch (err) {
    next(err);
  }
});

// 게시글 상세 조회
router.get("/:id", softAuthenticate, async (req, res, next) => {
  try {
    const articleId = parseInt(req.params.id);
    if (Number.isNaN(articleId)) {
      return next({ status: 400, message: "유효하지 않은 게시글 ID 입니다." });
    }

    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: { ...articleWriterSelect, ...articleLikeInclude(req.userId) },
    });
    if (!article) {
      return next({ status: 404, message: "게시글을 찾을 수 없습니다." });
    }

    res.json(serializeArticle(article));
  } catch (err) {
    next(err);
  }
});

// 게시글 수정 (작성자만)
router.patch("/:id", authenticate, async (req, res, next) => {
  try {
    const articleId = parseInt(req.params.id);
    if (Number.isNaN(articleId)) {
      return next({ status: 400, message: "유효하지 않은 게시글 ID 입니다." });
    }

    const existing = await prisma.article.findUnique({ where: { id: articleId } });
    if (!existing) {
      return next({ status: 404, message: "게시글을 찾을 수 없습니다." });
    }
    if (existing.writerId !== req.userId) {
      return next({ status: 403, message: "이 게시글을 수정할 권한이 없습니다." });
    }

    const { title, content, images } = req.body;
    const data = {};
    if (title !== undefined) data.title = title;
    if (content !== undefined) data.content = content;
    if (images !== undefined) {
      if (Array.isArray(images) && images.length > MAX_IMAGES) {
        return next({ status: 400, message: `이미지는 최대 ${MAX_IMAGES}개까지 등록할 수 있습니다.` });
      }
      data.images = normalizeImages(images);
    }

    const article = await prisma.article.update({
      where: { id: articleId },
      data,
      include: { ...articleWriterSelect, ...articleLikeInclude(req.userId) },
    });

    res.json(serializeArticle(article));
  } catch (err) {
    next(err);
  }
});

// 게시글 삭제 (작성자만)
router.delete("/:id", authenticate, async (req, res, next) => {
  try {
    const articleId = parseInt(req.params.id);
    if (Number.isNaN(articleId)) {
      return next({ status: 400, message: "유효하지 않은 게시글 ID 입니다." });
    }

    const existing = await prisma.article.findUnique({ where: { id: articleId } });
    if (!existing) {
      return next({ status: 404, message: "게시글을 찾을 수 없습니다." });
    }
    if (existing.writerId !== req.userId) {
      return next({ status: 403, message: "이 게시글을 삭제할 권한이 없습니다." });
    }

    await prisma.article.delete({ where: { id: articleId } });
    res.json({ message: `게시글이 삭제되었습니다. ${articleId}` });
  } catch (err) {
    next(err);
  }
});

// ===== 게시글 좋아요 =====

router.post("/:id/like", authenticate, async (req, res, next) => {
  try {
    const articleId = parseInt(req.params.id);
    if (Number.isNaN(articleId)) {
      return next({ status: 400, message: "유효하지 않은 게시글 ID 입니다." });
    }

    const article = await prisma.article.findUnique({ where: { id: articleId } });
    if (!article) {
      return next({ status: 404, message: "게시글을 찾을 수 없습니다." });
    }

    const already = await prisma.articleLike.findUnique({
      where: { userId_articleId: { userId: req.userId, articleId } },
    });

    if (!already) {
      await prisma.$transaction([
        prisma.articleLike.create({ data: { userId: req.userId, articleId } }),
        prisma.article.update({ where: { id: articleId }, data: { likeCount: { increment: 1 } } }),
      ]);
    }

    const updated = await prisma.article.findUnique({
      where: { id: articleId },
      include: articleWriterSelect,
    });
    res.json(serializeArticle(updated, { isLiked: true }));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id/like", authenticate, async (req, res, next) => {
  try {
    const articleId = parseInt(req.params.id);
    if (Number.isNaN(articleId)) {
      return next({ status: 400, message: "유효하지 않은 게시글 ID 입니다." });
    }

    const article = await prisma.article.findUnique({ where: { id: articleId } });
    if (!article) {
      return next({ status: 404, message: "게시글을 찾을 수 없습니다." });
    }

    const already = await prisma.articleLike.findUnique({
      where: { userId_articleId: { userId: req.userId, articleId } },
    });

    if (already) {
      await prisma.$transaction([
        prisma.articleLike.delete({
          where: { userId_articleId: { userId: req.userId, articleId } },
        }),
        prisma.article.update({ where: { id: articleId }, data: { likeCount: { decrement: 1 } } }),
      ]);
    }

    const updated = await prisma.article.findUnique({
      where: { id: articleId },
      include: articleWriterSelect,
    });
    res.json(serializeArticle(updated, { isLiked: false }));
  } catch (err) {
    next(err);
  }
});

// ===== 게시글 댓글 =====

// 댓글 목록 (cursor 페이지네이션)
router.get("/:id/comments", async (req, res, next) => {
  try {
    const articleId = parseInt(req.params.id);
    if (Number.isNaN(articleId)) {
      return next({ status: 400, message: "유효하지 않은 게시글 ID 입니다." });
    }

    const article = await prisma.article.findUnique({ where: { id: articleId } });
    if (!article) {
      return next({ status: 404, message: "게시글을 찾을 수 없습니다." });
    }

    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
    const cursor = parseInt(req.query.cursor);

    const rows = await prisma.comment.findMany({
      where: { articleId },
      orderBy: { id: "desc" },
      take: limit + 1,
      ...(Number.isNaN(cursor) ? {} : { cursor: { id: cursor }, skip: 1 }),
      include: writerSelect,
    });

    const hasMore = rows.length > limit;
    const listRows = hasMore ? rows.slice(0, limit) : rows;
    const nextCursor = hasMore ? listRows[listRows.length - 1].id : null;

    res.json({ list: listRows.map(serializeComment), nextCursor });
  } catch (err) {
    next(err);
  }
});

// 댓글 등록 (로그인 필요)
router.post("/:id/comments", authenticate, async (req, res, next) => {
  try {
    const articleId = parseInt(req.params.id);
    if (Number.isNaN(articleId)) {
      return next({ status: 400, message: "유효하지 않은 게시글 ID 입니다." });
    }

    const { content } = req.body;
    if (!content || !content.trim()) {
      return next({ status: 400, message: "댓글 내용을 입력해주세요." });
    }

    const article = await prisma.article.findUnique({ where: { id: articleId } });
    if (!article) {
      return next({ status: 404, message: "게시글을 찾을 수 없습니다." });
    }

    const comment = await prisma.comment.create({
      data: { content: content.trim(), articleId, writerId: req.userId },
      include: writerSelect,
    });

    res.status(201).json(serializeComment(comment));
  } catch (err) {
    next(err);
  }
});

export default router;
