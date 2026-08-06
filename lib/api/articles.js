// API 서버 주소 반환
function getApiBaseUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL 환경변수가 설정되지 않았습니다.");
  }

  return baseUrl.replace(/\/$/, "");
}

//게시글 조회
export async function getArticles({
  offset = 0,
  limit = 10,
  keyword = "",
  orderBy = "recent",
} = {}) {
  const params = new URLSearchParams({
    offset: String(offset),
    limit: String(limit),
    orderBy,
  });

  const trimmedKeyword = keyword.trim();

  if (trimmedKeyword) {
    params.set("keyword", trimmedKeyword);
  }

  const response = await fetch(`${getApiBaseUrl()}/articles?${params}`);

  if (!response.ok) {
    throw new Error(`게시글 목록 조회에 실패했습니다. (${response.status})`);
  }

  return response.json();
}

//게시글 작성
export async function createArticle(article) {
  const response = await fetch(`${getApiBaseUrl()}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });

  if (!response.ok) {
    throw new Error(`게시글 등록에 실패했습니다. (${response.status})`);
  }

  return response.json();
}

//게시글 상세조회
export async function getArticle(id) {
  const response = await fetch(
    `${getApiBaseUrl()}/articles/${encodeURIComponent(id)}`,
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`게시글 상세 조회에 실패했습니다. (${response.status})`);
  }

  return response.json();
}

//게시글 수정
export async function updateArticle(id, article) {
  const response = await fetch(
    `${getApiBaseUrl()}/articles/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    },
  );

  if (!response.ok) {
    throw new Error(`게시글 수정에 실패했습니다. (${response.status})`);
  }

  return response.json();
}

//게시글 삭제
export async function deleteArticle(id) {
  const response = await fetch(
    `${getApiBaseUrl()}/articles/${encodeURIComponent(id)}`,
    { method: "DELETE" },
  );

  if (!response.ok) {
    throw new Error(`게시글 삭제에 실패했습니다. (${response.status})`);
  }
}

//댓글 조회
export async function getArticleComments(articleId, { limit = 50 } = {}) {
  const params = new URLSearchParams({ limit: String(limit) });
  const response = await fetch(
    `${getApiBaseUrl()}/articles/${encodeURIComponent(articleId)}/comments?${params}`,
  );

  if (!response.ok) {
    throw new Error(`댓글 목록 조회에 실패했습니다. (${response.status})`);
  }

  return response.json();
}

//댓글 생성
export async function createArticleComment(articleId, content) {
  const response = await fetch(
    `${getApiBaseUrl()}/articles/${encodeURIComponent(articleId)}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    },
  );

  if (!response.ok) {
    throw new Error(`댓글 등록에 실패했습니다. (${response.status})`);
  }

  return response.json();
}

//댓글 수정
export async function updateArticleComment(commentId, content) {
  const response = await fetch(
    `${getApiBaseUrl()}/article-comments/${encodeURIComponent(commentId)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    },
  );

  if (!response.ok) {
    throw new Error(`댓글 수정에 실패했습니다. (${response.status})`);
  }

  return response.json();
}

//댓글 삭제
export async function deleteArticleComment(commentId) {
  const response = await fetch(
    `${getApiBaseUrl()}/article-comments/${encodeURIComponent(commentId)}`,
    { method: "DELETE" },
  );

  if (!response.ok) {
    throw new Error(`댓글 삭제에 실패했습니다. (${response.status})`);
  }
}
