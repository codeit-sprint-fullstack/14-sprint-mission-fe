// =============================================
// ArticleService.js
// 게시글(Article) 관련 API 호출 함수 모음
// 비동기 처리: .then() / .catch()
// =============================================

const BASE_URL = "https://panda-market-api-crud.vercel.app";

// 응답 상태가 2XX가 아니면 콘솔에 에러 출력 후 JSON 반환
function checkStatus(response) {
  if (!response.ok) {
    console.error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

// 게시글 목록 조회 (페이지, 페이지 크기, 검색어 쿼리 파라미터)
export function getArticleList({ page = 1, pageSize = 10, keyword = "" } = {}) {
  return fetch(`${BASE_URL}/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
    .then(checkStatus)
    .catch((error) => console.error("getArticleList 오류:", error));
}

// 게시글 단건 조회
export function getArticle(articleId) {
  return fetch(`${BASE_URL}/articles/${articleId}`)
    .then(checkStatus)
    .catch((error) => console.error("getArticle 오류:", error));
}

// 게시글 등록 (title, content, image)
export function createArticle({ title, content, image }) {
  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, image }),
  })
    .then(checkStatus)
    .catch((error) => console.error("createArticle 오류:", error));
}

// 게시글 수정 (변경할 필드만 updates에 담아서 전달)
export function patchArticle(articleId, updates) {
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  })
    .then(checkStatus)
    .catch((error) => console.error("patchArticle 오류:", error));
}

// 게시글 삭제
export function deleteArticle(articleId) {
  return fetch(`${BASE_URL}/articles/${articleId}`, { method: "DELETE" })
    .then(checkStatus)
    .catch((error) => console.error("deleteArticle 오류:", error));
}
