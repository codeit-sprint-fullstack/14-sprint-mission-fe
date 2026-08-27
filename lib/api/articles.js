import apiClient from "@/lib/api/client";

export async function getArticles({
  offset = 0,
  limit = 10,
  keyword = "",
  orderBy = "recent",
} = {}) {
  const pageSize = Math.max(1, limit);
  const page = Math.floor(offset / pageSize) + 1;
  const params = { page, pageSize, orderBy };
  const trimmedKeyword = keyword.trim();

  if (trimmedKeyword) params.keyword = trimmedKeyword;

  const response = await apiClient.get("/articles", { params });
  return response.data;
}

export async function createArticle(article) {
  const response = await apiClient.post("/articles", article);
  return response.data;
}

export async function getArticle(id) {
  try {
    const response = await apiClient.get(`/articles/${encodeURIComponent(id)}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
}

export async function updateArticle(id, article) {
  const response = await apiClient.patch(
    `/articles/${encodeURIComponent(id)}`,
    article,
  );
  return response.data;
}

export async function deleteArticle(id) {
  const response = await apiClient.delete(`/articles/${encodeURIComponent(id)}`);
  return response.data;
}

export async function getArticleComments(articleId, { limit = 50 } = {}) {
  const response = await apiClient.get(
    `/articles/${encodeURIComponent(articleId)}/comments`,
    { params: { limit } },
  );
  return response.data;
}

export async function createArticleComment(articleId, content) {
  const response = await apiClient.post(
    `/articles/${encodeURIComponent(articleId)}/comments`,
    { content },
  );
  return response.data;
}

export async function updateArticleComment(commentId, content) {
  const response = await apiClient.patch(
    `/article-comments/${encodeURIComponent(commentId)}`,
    { content },
  );
  return response.data;
}

export async function deleteArticleComment(commentId) {
  const response = await apiClient.delete(
    `/article-comments/${encodeURIComponent(commentId)}`,
  );
  return response.data;
}
