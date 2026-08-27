import commentRepository from "../repositories/commentRepository.js";
import createHttpError from "../utils/createHttpError.js";

function validateCommentContent(content) {
  if (typeof content !== "string" || !content.trim()) {
    throw createHttpError(400, "댓글 내용을 입력해 주세요.");
  }

  return content.trim();
}

async function createComment({ content, productId, articleId, ownerId }) {
  const trimmedContent = validateCommentContent(content);

  return commentRepository.createComment({
    content: trimmedContent,
    productId,
    articleId,
    ownerId,
  });
}

export async function createProductComment({ content, productId, ownerId }) {
  return createComment({
    content,
    productId,
    ownerId,
  });
}

export async function createArticleComment({ content, articleId, ownerId }) {
  return createComment({
    content,
    articleId,
    ownerId,
  });
}

async function getComments({ productId, articleId, cursor, limit = 10 }) {
  const limitNumber = Number(limit);

  if (!Number.isInteger(limitNumber) || limitNumber < 1) {
    throw createHttpError(400, "댓글 조회 요청이 올바르지 않습니다.");
  }

  const comments = await commentRepository.findComments({
    productId,
    articleId,
    cursor,
    take: limitNumber + 1,
  });

  const hasMoreComments = comments.length > limitNumber;

  const list = hasMoreComments ? comments.slice(0, limitNumber) : comments;

  const nextCursor = hasMoreComments ? list[list.length - 1].id : null;

  return {
    list,
    nextCursor,
  };
}

export async function getProductComments({ productId, cursor, limit = 10 }) {
  return getComments({
    productId,
    cursor,
    limit,
  });
}

export async function getArticleComments({ articleId, cursor, limit = 10 }) {
  return getComments({
    articleId,
    cursor,
    limit,
  });
}

async function ensureCommentOwner(id, userId) {
  const comment = await commentRepository.findOwnerById(id);

  if (!comment) {
    throw createHttpError(404, "댓글을 찾을 수 없습니다.");
  }

  if (comment.ownerId !== userId) {
    throw createHttpError(403, "댓글을 수정하거나 삭제할 권한이 없습니다.");
  }
}

export async function updateComment({ id, userId, content }) {
  await ensureCommentOwner(id, userId);

  const trimmedContent = validateCommentContent(content);

  return commentRepository.updateById(id, trimmedContent);
}

export async function deleteComment(id, userId) {
  await ensureCommentOwner(id, userId);

  await commentRepository.deleteById(id);
}
