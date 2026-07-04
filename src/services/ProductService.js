import { PRODUCT_ORDER_BY } from '../constants/product'
import { createApiClient, createQueryString } from './apiClient'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

const requestProduct = createApiClient({
  baseUrl: BASE_URL,
  errorMessage: '상품 요청에 실패했습니다.',
})

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
