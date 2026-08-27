// 클라이언트에 노출할 유저 형태 (encryptedPassword / refreshToken / email 제외)
// panda-market-api 의 GET /users/me 응답 스펙과 동일
export function serializeUser(user) {
  return {
    id: user.id,
    nickname: user.nickname,
    image: user.image,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
