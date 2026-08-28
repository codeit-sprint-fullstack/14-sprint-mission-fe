export function formatLikeResource(resource, likeField) {
  const { _count, [likeField]: likes = [], ...resourceData } = resource;

  return {
    ...resourceData,
    likeCount: _count[likeField],
    isLiked: likes.length > 0,
  };
}
