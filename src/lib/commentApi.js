import apiClient from "./apiClient";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3001";

export async function getArticleComments(articleId) {
  const res = await fetch(`${API_BASE_URL}/articles/${articleId}/comments`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("댓글 목록을 불러오지 못했습니다.");
  }

  return res.json();
}

export async function createArticleComment(articleId, content) {
  const response = await apiClient.post(`/articles/${articleId}/comments`, {
    content,
  });

  return response.data;
}

export async function updateArticleComment(commentId, content) {
  const response = await apiClient.patch(`/comments/${commentId}`, {
    content,
  });

  return response.data;
}

export async function deleteArticleComment(commentId) {
  await apiClient.delete(`/comments/${commentId}`);
}
