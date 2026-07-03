import { PRODUCT_ORDER_BY } from '../constants/product'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

const createQueryString = (params) => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value)
    }
  })

  return searchParams.toString()
}

const fetchProduct = async (path, options) => {
  try {
    return await fetch(`${BASE_URL}${path}`, options)
  } catch {
    throw new Error('상품 요청에 실패했습니다.')
  }
}

const requestProduct = async (path, options = {}) => {
  const response = await fetchProduct(path, options)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message ?? '상품 요청에 실패했습니다.')
  }

  if (response.status === 204) {
    return null
  }

  return await response.json()
}

export const getProductList = async ({
  offset = 0,
  limit = 10,
  keyword = '',
  orderBy = PRODUCT_ORDER_BY.RECENT,
} = {}) => {
  const queryString = createQueryString({ offset, limit, keyword, orderBy })

  return await requestProduct(`/products?${queryString}`)
}

export const getProduct = async (productId) => {
  return await requestProduct(`/products/${productId}`)
}

export const createProduct = async ({ name, description, price, tags }) => {
  return await requestProduct('/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description, price, tags }),
  })
}

export const patchProduct = async (productId, product) => {
  return await requestProduct(`/products/${productId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
}

export const deleteProduct = async (productId) => {
  return await requestProduct(`/products/${productId}`, {
    method: 'DELETE',
  })
}
