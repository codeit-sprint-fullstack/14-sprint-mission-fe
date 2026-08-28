import { fetchWithAuth } from './fetchWithAuth'

const PRODUCT_API_URL = 'https://panda-market-api.vercel.app/products'

async function requestProducts(params) {
  const url = new URL(PRODUCT_API_URL)
  url.search = new URLSearchParams(params).toString()

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`상품 목록을 불러오지 못했습니다. (${res.status})`)
  }

  return res.json()
}

async function getProducts({ orderBy, pageSize, keyword, page }) {
  return requestProducts({
    page: String(page),
    pageSize: String(pageSize),
    orderBy,
    keyword,
  })
}

async function getBestProducts({ pageSize }) {
  return requestProducts({
    page: '1',
    pageSize: String(pageSize),
    orderBy: 'favorite',
  })
}

async function getProductDetail(productId) {
  const res = await fetchWithAuth(`${PRODUCT_API_URL}/${productId}`)

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    const error = new Error(
      errorData?.message ||
        `상품 상세 정보를 불러오지 못했습니다. (${res.status})`,
    )

    error.status = res.status
    throw error
  }

  return res.json()
}

async function updateProduct({ productId, product }) {
  const res = await fetchWithAuth(`${PRODUCT_API_URL}/${productId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    const error = new Error(
      errorData?.message || `상품을 수정하지 못했습니다. (${res.status})`,
    )

    error.status = res.status
    throw error
  }

  return res.json()
}

async function deleteProduct(productId) {
  const res = await fetchWithAuth(`${PRODUCT_API_URL}/${productId}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    const error = new Error(
      errorData?.message || `상품을 삭제하지 못했습니다. (${res.status})`,
    )

    error.status = res.status
    throw error
  }

  return res.json()
}

async function requestProductFavorite(productId, method) {
  const res = await fetchWithAuth(`${PRODUCT_API_URL}/${productId}/favorite`, {
    method,
  })

  const responseData =
    res.status === 204 ? null : await res.json().catch(() => null)

  if (!res.ok) {
    const error = new Error(
      responseData?.message ?? '상품 좋아요 요청에 실패했습니다.',
    )

    error.status = res.status
    throw error
  }

  return responseData
}

function addProductFavorite(productId) {
  return requestProductFavorite(productId, 'POST')
}

function removeProductFavorite(productId) {
  return requestProductFavorite(productId, 'DELETE')
}

export {
  getProducts,
  getBestProducts,
  getProductDetail,
  updateProduct,
  deleteProduct,
  addProductFavorite,
  removeProductFavorite,
}
