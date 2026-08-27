import express from "express";
import prisma from "../src/lib/prisma.js";
import { authenticate } from "../src/middlewares/authenticate.js";
import { writerSelect, serializeComment } from "../src/lib/comment.js";

const router = express.Router();

// 댓글 수정 (작성자만)
router.patch("/:commentId", authenticate, async (req, res, next) => {
  try {
    const commentId = parseInt(req.params.commentId);
    if (Number.isNaN(commentId)) {
      return next({ status: 400, message: "유효하지 않은 댓글 ID 입니다." });
    }

    const { content } = req.body;
    if (!content || !content.trim()) {
      return next({ status: 400, message: "댓글 내용을 입력해주세요." });
    }

    const existing = await prisma.comment.findUnique({ where: { id: commentId } });
    if (!existing) {
      return next({ status: 404, message: "댓글을 찾을 수 없습니다." });
    }
    if (existing.writerId !== req.userId) {
      return next({ status: 403, message: "이 댓글을 수정할 권한이 없습니다." });
    }

    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: { content: content.trim() },
      include: writerSelect,
    });

    res.json(serializeComment(comment));
  } catch (err) {
    next(err);
  }
});

// 댓글 삭제 (작성자만)
router.delete("/:commentId", authenticate, async (req, res, next) => {
  try {
    const commentId = parseInt(req.params.commentId);
    if (Number.isNaN(commentId)) {
      return next({ status: 400, message: "유효하지 않은 댓글 ID 입니다." });
    }

    const existing = await prisma.comment.findUnique({ where: { id: commentId } });
    if (!existing) {
      return next({ status: 404, message: "댓글을 찾을 수 없습니다." });
    }
    if (existing.writerId !== req.userId) {
      return next({ status: 403, message: "이 댓글을 삭제할 권한이 없습니다." });
    }

    await prisma.comment.delete({ where: { id: commentId } });

    res.json({ message: `댓글이 삭제되었습니다. ${commentId}` });
  } catch (err) {
    next(err);
  }
});

export default router;
