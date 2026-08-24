import apiClient from "./apiClient";

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
} = {}) {
  const params = {
    page,
    pageSize,
    orderBy,
  };

  if (keyword.trim()) {
    params.keyword = keyword.trim();
  }

  const response = await apiClient.get("/products", {
    params,
  });

  return response.data;
}

export async function getProduct(productId) {
  const response = await apiClient.get(`/products/${productId}`);

  return response.data;
}

export async function updateProduct(productId, productData) {
  const response = await apiClient.patch(`/products/${productId}`, productData);

  return response.data;
}

export async function deleteProduct(productId) {
  const response = await apiClient.delete(`/products/${productId}`);

  return response.data;
}

export async function favoriteProduct(productId) {
  const response = await apiClient.post(`/products/${productId}/favorite`);

  return response.data;
}

export async function unfavoriteProduct(productId) {
  const response = await apiClient.delete(`/products/${productId}/favorite`);

  return response.data;
}
