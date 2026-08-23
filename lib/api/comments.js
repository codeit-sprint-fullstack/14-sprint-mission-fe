import apiClient from "./client";

export async function getProductComments({ productId, limit = 10, cursor }) {
  const response = await apiClient.get(`/products/${productId}/comments`, {
    params: { limit, ...(cursor != null && { cursor }) },
  });
  return response.data;
}

export async function createProductComment({ productId, content }) {
  const response = await apiClient.post(`/products/${productId}/comments`, { content });
  return response.data;
}

export async function updateComment({ commentId, content }) {
  const response = await apiClient.patch(`/comments/${commentId}`, { content });
  return response.data;
}

export async function deleteComment(commentId) {
  const response = await apiClient.delete(`/comments/${commentId}`);
  return response.data;
}
