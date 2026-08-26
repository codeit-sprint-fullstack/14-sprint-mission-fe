import apiClient from "./apiClient";

export async function getProductComments({ productId, limit, cursor }) {
  const params = {
    limit,
  };

  if (cursor != null) {
    params.cursor = cursor;
  }

  const response = await apiClient.get(`/products/${productId}/comments`, {
    params,
  });

  return response.data;
}

export async function createProductComment(productId, content) {
  const response = await apiClient.post(`/products/${productId}/comments`, {
    content,
  });

  return response.data;
}

export async function updateProductComment(commentId, content) {
  const response = await apiClient.patch(`/comments/${commentId}`, {
    content,
  });

  return response.data;
}

export async function deleteProductComment(commentId) {
  const response = await apiClient.delete(`/comments/${commentId}`);

  return response.data;
}
