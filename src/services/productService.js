import { PRODUCT_ORDER_BY } from '../constants/product'
import { createApiClient, createQueryString } from './apiClient'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

const requestProduct = createApiClient({
  baseUrl: BASE_URL,
  errorMessage: '상품 요청에 실패했습니다.',
})

export const getProductList = ({
  offset = 0,
  limit = 10,
  keyword = '',
  orderBy = PRODUCT_ORDER_BY.RECENT,
} = {}) => {
  const queryString = createQueryString({ offset, limit, keyword, orderBy })

  return requestProduct(`/products?${queryString}`)
}

export const getProduct = (productId) => {
  return requestProduct(`/products/${productId}`)
}

export const createProduct = ({ name, description, price, tags }) => {
  return requestProduct('/products', {
    method: 'POST',
    body: { name, description, price, tags },
  })
}

export const patchProduct = (productId, product) => {
  return requestProduct(`/products/${productId}`, {
    method: 'PATCH',
    body: product,
  })
}

export const deleteProduct = (productId) => {
  return requestProduct(`/products/${productId}`, {
    method: 'DELETE',
  })
}
