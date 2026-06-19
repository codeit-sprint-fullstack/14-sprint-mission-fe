import { PRODUCT_ORDER_BY } from '../constants/product'

const BASE_URL = 'https://panda-market-api-crud.vercel.app'

const createQueryString = (params) => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value)
    }
  })

  return searchParams.toString()
}

const requestProduct = async (path, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${path}`, options)

    if (!response.ok) {
      console.error(`Product API error: ${response.status}`)
      throw new Error('Product API request failed')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

export const getProductList = async (
  page = 1,
  pageSize = 10,
  keyword = '',
  orderBy = PRODUCT_ORDER_BY.RECENT,
) => {
  const queryString = createQueryString({ page, pageSize, keyword, orderBy })

  return await requestProduct(`/products?${queryString}`)
}

export const getProduct = async (productId) => {
  return await requestProduct(`/products/${productId}`)
}

export const createProduct = async ({
  name,
  description,
  price,
  tags,
  images,
}) => {
  return await requestProduct('/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description, price, tags, images }),
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
