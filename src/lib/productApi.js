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

export async function createProduct(productData) {
  const formData = new FormData();

  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", String(productData.price));

  productData.tags.forEach((tag) => {
    formData.append("tags", tag);
  });

  productData.newImages.forEach((image) => {
    formData.append("images", image);
  });

  const response = await apiClient.post("/products", formData);

  return response.data;
}

export async function updateProduct(productId, productData) {
  const formData = new FormData();

  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", String(productData.price));

  if (productData.tags.length === 0) {
    formData.append("tags", "");
  } else {
    productData.tags.forEach((tag) => {
      formData.append("tags", tag);
    });
  }

  if (
    productData.existingImages.length === 0 &&
    productData.newImages.length === 0
  ) {
    formData.append("images", "");
  } else {
    productData.existingImages.forEach((imageUrl) => {
      formData.append("images", imageUrl);
    });

    productData.newImages.forEach((image) => {
      formData.append("images", image);
    });
  }

  const response = await apiClient.patch(`/products/${productId}`, formData);

  return response.data;
}

export async function deleteProduct(productId) {
  await apiClient.delete(`/products/${productId}`);
}

export async function likeProduct(productId) {
  const response = await apiClient.post(`/products/${productId}/likes`);

  return response.data;
}

export async function unlikeProduct(productId) {
  const response = await apiClient.delete(`/products/${productId}/likes`);

  return response.data;
}
