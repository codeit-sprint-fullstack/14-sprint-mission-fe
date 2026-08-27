// 댓글 조회 시 writer 를 함께 select
export const commentWriterSelect = {
  writer: { select: { id: true, nickname: true, image: true } },
};

// 응답 형태 (panda-market-api 와 동일): { id, content, createdAt, updatedAt, writer }
export function serializeComment(comment) {
  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    writer: comment.writer,
  };
}
