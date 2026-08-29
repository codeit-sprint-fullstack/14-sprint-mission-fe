const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export async function getBestProducts(pageSize = 4) {
  const params = new URLSearchParams({
    page: "1",
    pageSize: String(pageSize),
    orderBy: "favorite",
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?${params.toString()}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("베스트 상품 조회 실패");

  return res.json();
}
  
export async function getProductList({
  page = 1,
  pageSize = 4,
  orderBy = "recent",
  keyword = "",
}) {
  const params = new URLSearchParams({ page, pageSize, orderBy });

  if (keyword.trim()) {
    params.append("keyword", keyword);
  }

  const response = await fetch(`${BASE_URL}/products?${params}`);

  if (!response.ok) throw new Error("상품 목록 조회 실패");

  return response.json();
}

export async function getProduct(productId, token) {
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    headers,
  });

  if (!response.ok) throw new Error("상품 상세 조회 실패");

  return response.json();
}

export async function createProduct({
  name,
  description,
  price,
  tags,
  images,
}) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      description,
      price,
      tags,
      images,
    }),
  });

  if (!response.ok) throw new Error("상품 등록 실패");

  return response.json();
}

export async function updateProduct(
  productId,
  { name, description, price, tags, images },
) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      description,
      price,
      tags,
      images,
    }),
  });

  if (!response.ok) throw new Error("상품 수정 실패");

  return response.json();
}

export async function deleteProduct(productId) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("상품 삭제 실패");

  return response.status === 204 ? null : response.json();
}

export async function likeProduct(productId) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BASE_URL}/products/${productId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("좋아요 API 실패:", {
      status: response.status,
      data,
    });

    throw new Error(data.message || `상품 좋아요 실패 (${response.status})`);
  }

  return data;
}

export async function unlikeProduct(productId) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BASE_URL}/products/${productId}/like`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("좋아요 취소 API 실패:", {
      status: response.status,
      data,
    });

    throw new Error(
      data.message || `상품 좋아요 취소 실패 (${response.status})`,
    );
  }

  return data;
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${BASE_URL}/images/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("이미지 업로드 실패");

  return response.json();
}
