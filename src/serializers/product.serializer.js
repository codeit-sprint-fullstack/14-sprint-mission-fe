// owner 관계를 항상 함께 조회
export const productOwnerSelect = {
  owner: { select: { id: true, nickname: true, image: true } },
};

// 로그인 유저의 좋아요 여부 조회용 include (userId 없으면 조회 안 함)
export const productFavoriteInclude = (userId) =>
  userId ? { favorites: { where: { userId }, select: { id: true } } } : {};

// 응답 형태: owner 를 펼쳐 ownerId / ownerNickname 제공 (프론트/panda-market-api 호환)
// isFavorite: 명시값 우선, 없으면 include 된 favorites 로 판단
export function serializeProduct(product, { isFavorite } = {}) {
  const { owner, favorites, ...rest } = product;
  const liked = isFavorite ?? (Array.isArray(favorites) ? favorites.length > 0 : false);
  return {
    ...rest,
    ownerNickname: owner?.nickname ?? null,
    owner,
    isFavorite: liked, // 프론트/panda 호환 필드명
    isLiked: liked,    // 요구사항 명세 필드명
  };
}
