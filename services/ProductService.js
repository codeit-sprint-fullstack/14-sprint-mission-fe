const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export async function getProductList({
  page = 1,
  pageSize = 4,
  orderBy = "recent",
  keyword = "",
}) {
  const params = new URLSearchParams({ page, pageSize, orderBy });
  if (keyword.trim()) params.append("keyword", keyword);

  const response = await fetch(`${BASE_URL}/products?${params}`);
  if (!response.ok) throw new Error("상품 목록 조회 실패");
  return response.json();
}

export async function createProduct({ name, description, price, tags, images }) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, price, tags, images }),
  });

  if (!response.ok) throw new Error("상품 등록 실패");
  return response.json();
}

export async function likeProduct(productId) {
  const response = await fetch(`${BASE_URL}/products/${productId}/favorite`, {
    method: "PATCH",
  });
  if (!response.ok) throw new Error("상품 좋아요 실패");
  return response.json();
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${BASE_URL}/images/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("이미지 업로드 실패");
  return response.json(); // { url }
}