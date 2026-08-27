import apiClient from "./client";

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
} = {}) {
  const response = await apiClient.get("/products", {
    params: {
      page,
      pageSize,
      orderBy,
      ...(keyword.trim() && { keyword: keyword.trim() }),
    },
  });

  return response.data;
}

export async function getProduct(productId) {
  const response = await apiClient.get(`/products/${productId}`);
  return response.data;
}

export async function uploadProductImage(imageFile) {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await apiClient.post("/images/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.url;
}

export async function createProduct(productData) {
  const response = await apiClient.post("/products", productData);
  return response.data;
}

export async function updateProduct({ productId, productData }) {
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
