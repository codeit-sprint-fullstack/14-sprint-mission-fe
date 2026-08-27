// 게시글 조회 시 writer 를 함께 select (panda-market-api 스펙: id, nickname)
export const articleWriterSelect = {
  writer: { select: { id: true, nickname: true } },
};

// 로그인 유저의 좋아요 여부 조회용 include (userId 없으면 조회 안 함)
export const articleLikeInclude = (userId) =>
  userId ? { likes: { where: { userId }, select: { id: true } } } : {};

// 응답 형태: { id, title, content, images, likeCount, createdAt, updatedAt, writer, isLiked }
export function serializeArticle(article, { isLiked } = {}) {
  const { likes, writer, writerId, ...rest } = article;
  return {
    ...rest,
    writer,
    isLiked: isLiked ?? (Array.isArray(likes) ? likes.length > 0 : false),
  };
}
