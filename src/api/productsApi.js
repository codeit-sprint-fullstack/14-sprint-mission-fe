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
