const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3001";

export async function getArticles({ keyword = "", limit } = {}) {
  const params = new URLSearchParams();

  if (keyword) {
    params.set("keyword", keyword);
  }

  if (limit) {
    params.set("limit", String(limit));
  }

  const queryString = params.toString();
  const url = `${API_BASE_URL}/articles${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("게시글 목록을 불러오지 못했습니다.");
  }

  return res.json();
}

export async function getArticle(id) {
  const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("게시글을 불러오지 못했습니다.");
  }

  return res.json();
}

export async function createArticle(title, content) {
  const res = await fetch(`${API_BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    throw new Error("게시글을 등록하지 못했습니다.");
  }

  return res.json();
}

export async function updateArticle(articleId, title, content) {
  const res = await fetch(`${API_BASE_URL}/articles/${articleId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    throw new Error("게시글을 수정하지 못했습니다.");
  }

  return res.json();
}

export async function deleteArticle(articleId) {
  const res = await fetch(`${API_BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("게시글을 삭제하지 못했습니다.");
  }
}
