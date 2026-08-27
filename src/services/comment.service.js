import { commentRepository } from "../repositories/comment.repository.js";
import { serializeComment } from "../serializers/comment.serializer.js";
import { NotFound, Forbidden, BadRequest } from "../errors/HttpError.js";

// 댓글 로드 + 작성자 확인 (상품·게시글 댓글 공용)
async function getOwnedComment(commentId, userId) {
  const comment = await commentRepository.findById(commentId);
  if (!comment) throw NotFound("댓글을 찾을 수 없습니다.");
  if (comment.writerId !== userId) throw Forbidden("이 댓글에 대한 권한이 없습니다.");
  return comment;
}

export const commentService = {
  async update(commentId, content, userId) {
    if (!content || !content.trim()) throw BadRequest("댓글 내용을 입력해주세요.");
    await getOwnedComment(commentId, userId);

    const comment = await commentRepository.update(commentId, { content: content.trim() });
    return serializeComment(comment);
  },

  async remove(commentId, userId) {
    await getOwnedComment(commentId, userId);
    await commentRepository.remove(commentId);
    return { message: `댓글이 삭제되었습니다. ${commentId}` };
  },
};
