import apiClient from "./apiClient";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3001";

export async function getArticles({ keyword = "", pageSize } = {}) {
  const params = new URLSearchParams();

  if (keyword) {
    params.set("keyword", keyword);
  }

  if (pageSize) {
    params.set("pageSize", String(pageSize));
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
  const response = await apiClient.post("/articles", {
    title,
    content,
  });

  return response.data;
}

export async function updateArticle(articleId, title, content) {
  const response = await apiClient.patch(`/articles/${articleId}`, {
    title,
    content,
  });

  return response.data;
}

export async function deleteArticle(articleId) {
  await apiClient.delete(`/articles/${articleId}`);
}
