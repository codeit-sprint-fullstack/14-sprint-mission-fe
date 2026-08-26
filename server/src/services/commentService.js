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
