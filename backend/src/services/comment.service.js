import AppError from "../errors/AppError.js";
import commentRepository from "../repositories/comment.repository.js";
import productRepository from "../repositories/product.repository.js";

export async function createProductComment(productId, content, userId) {
  const trimmedContent = typeof content === "string" ? content.trim() : "";

  if (!trimmedContent) {
    throw new AppError(400, "댓글 내용을 입력해 주세요.");
  }

  const product = await productRepository.findById(productId);

  if (!product) {
    throw new AppError(404, "상품을 찾을 수 없습니다.");
  }

  return commentRepository.saveProductComment({
    content: trimmedContent,
    productId,
    userId,
  });
}

export async function updateComment(commentId, content, userId) {
  const parsedCommentId = Number(commentId);

  if (!Number.isInteger(parsedCommentId) || parsedCommentId < 1) {
    throw new AppError(400, "올바른 댓글 ID가 아닙니다.");
  }

  const trimmedContent = typeof content === "string" ? content.trim() : "";

  if (!trimmedContent) {
    throw new AppError(400, "댓글 내용을 입력해 주세요.");
  }

  const comment = await commentRepository.findById(parsedCommentId);

  if (!comment) {
    throw new AppError(404, "댓글을 찾을 수 없습니다.");
  }

  if (comment.userId !== userId) {
    throw new AppError(403, "댓글을 수정할 권한이 없습니다.");
  }

  return commentRepository.update(parsedCommentId, trimmedContent);
}

export async function deleteComment(commentId, userId) {
  const parsedCommentId = Number(commentId);

  if (!Number.isInteger(parsedCommentId) || parsedCommentId < 1) {
    throw new AppError(400, "올바른 댓글 ID가 아닙니다.");
  }

  const comment = await commentRepository.findById(parsedCommentId);

  if (!comment) {
    throw new AppError(404, "댓글을 찾을 수 없습니다.");
  }

  if (comment.userId !== userId) {
    throw new AppError(403, "댓글을 삭제할 권한이 없습니다.");
  }

  await commentRepository.remove(parsedCommentId);
}
