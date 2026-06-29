const BASE_URL = 'http://localhost:3000'


export async function getProducts({
  offset = 0,
  limit = 10,
  keyword = '',
  orderBy = 'recent',
}) {
  const query = new URLSearchParams({
    offset,
    limit,
    keyword,
    orderBy,
  })

  const response = await fetch(`${BASE_URL}/products?${query}`)

  if (!response.ok) {
    throw new Error('상품 목록 조회 실패')
  }

  return response.json()
}

export async function createProduct(productData) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  })

  if (!response.ok) {
    throw new Error('상품 등록 실패')
  }

  return response.json()
}