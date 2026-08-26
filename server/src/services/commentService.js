import commentRepository from "../repositories/commentRepository.js";
import createHttpError from "../utils/createHttpError.js";

export async function createProductComment({ content, productId, ownerId }) {
  if (typeof content !== "string" || !content.trim()) {
    throw createHttpError(400, "댓글 내용을 입력해 주세요.");
  }

  return commentRepository.createProductComment({
    content: content.trim(),
    productId,
    ownerId,
  });
}

export async function getProductComments({ productId, cursor, limit = 10 }) {
  const limitNumber = Number(limit);

  if (!Number.isInteger(limitNumber) || limitNumber < 1) {
    throw createHttpError(400, "댓글 조회 요청이 올바르지 않습니다.");
  }

  const comments = await commentRepository.findProductComments({
    productId,
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
