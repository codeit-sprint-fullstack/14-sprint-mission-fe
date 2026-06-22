const BASE_URL = "https://panda-market-api.vercel.app";

export async function getProductList({
  page = 1,
  pageSize = 4,
  orderBy = "recent",
  keyword = "",
}) {
  const params = new URLSearchParams({
    page,
    pageSize,
    orderBy,
  });

  if (keyword.trim()) {
    params.append("keyword", keyword);
  }

  const response = await fetch(
    `${BASE_URL}/products?${params}`
  );

  if (!response.ok) {
    throw new Error("상품 목록 조회 실패");
  }

  return response.json();
}