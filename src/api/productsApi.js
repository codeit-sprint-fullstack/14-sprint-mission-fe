const BASE_URL = "https://panda-market-api.vercel.app";

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
}) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy,
  });

  if (keyword) {
    params.set("keyword", keyword);
  }

  const response = await fetch(`${BASE_URL}/products?${params.toString()}`);

  if (!response.ok) {
    throw new Error("상품 목록을 불러오지 못했습니다.");
  }

  return response.json();
}

export async function createProduct(productData, accessToken) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(productData),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "상품을 등록하지 못했습니다.");

    error.status = response.status;
    throw error;
  }

  return data;
}

export async function updateProduct(productId, productData, accessToken) {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(productData),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "상품을 수정하지 못했습니다.");

    error.status = response.status;
    throw error;
  }

  return data;
}

export async function getProductDetail(productId, accessToken) {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "상품 정보를 불러오지 못했습니다.");

    error.status = response.status;
    throw error;
  }

  return data;
}

export async function uploadProductImage(imageFile, accessToken) {
  const extension = imageFile.name.split(".").pop();
  const safeFileName = `product-image-${Date.now()}.${extension}`;
  const renamedImageFile = new File([imageFile], safeFileName, {
    type: imageFile.type,
  });

  const formData = new FormData();

  formData.append("image", renamedImageFile);

  const response = await fetch(`${BASE_URL}/images/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "이미지를 업로드하지 못했습니다.");

    error.status = response.status;
    throw error;
  }

  return data.url;
}

export async function addProductFavorite(productId, accessToken) {
  const response = await fetch(`${BASE_URL}/products/${productId}/favorite`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "좋아요를 추가하지 못했습니다.");

    error.status = response.status;
    throw error;
  }

  return data;
}

export async function removeProductFavorite(productId, accessToken) {
  const response = await fetch(`${BASE_URL}/products/${productId}/favorite`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "좋아요를 취소하지 못했습니다.");

    error.status = response.status;
    throw error;
  }

  return data;
}

export async function deleteProduct(productId, accessToken) {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    const error = new Error(data.message || "상품을 삭제하지 못했습니다.");

    error.status = response.status;
    throw error;
  }
}
