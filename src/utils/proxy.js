// Next.js API 라우트(프록시)에서 백엔드 응답/에러를 그대로 클라이언트로 중계한다.
// 상태코드와 서버 메시지가 보존되어야 프론트에서 상태코드별 피드백이 가능하다.

// fetch 응답 중계 (성공/에러 공통)
export async function relay(res, response) {
  const data = await response.json().catch(() => null);
  return res.status(response.status).json(data ?? { message: "요청을 처리하지 못했습니다." });
}

// axios 에러 중계
export function relayAxiosError(res, error) {
  if (error?.response) {
    return res.status(error.response.status).json(error.response.data);
  }
  console.error("Proxy error:", error?.message);
  return res.status(502).json({ message: "백엔드 서버에 연결할 수 없습니다." });
}
