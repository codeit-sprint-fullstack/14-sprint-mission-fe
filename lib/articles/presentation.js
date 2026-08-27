//닉네임. 좋아요 수 id값에 따라 랜덤 설정
const NICKNAMES = ["총명한 판다", "튼튼한 판다", "똑똑한 판다"];

export function getMockMetadata(id) {
  const seed = Array.from(String(id)).reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );

  return {
    nickname: NICKNAMES[seed % NICKNAMES.length],
    likeCount: 100 + (seed % 900),
  };
}

//날짜 설정
export function formatDate(createdAt) {
  return new Date(createdAt).toISOString().slice(0, 10).replaceAll("-", ". ");
}
