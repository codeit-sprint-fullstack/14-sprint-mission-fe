import axios from 'axios'

const PRODUCT_API_URL = 'http://localhost:3000/products'

async function getProducts({ keyword, sort, offset, pageSize }) {
  const res = await axios.get(PRODUCT_API_URL, {
    params: {
      keyword,
      sort,
      offset,
      pageSize,
    },
  })

  return res.data
}
// 다음 미션에서 베스트 상품 API 연결 시 다시 사용
async function getBestProducts({ pageSize }) {
  const res = await axios.get(PRODUCT_API_URL, {
    params: {
      orderBy: 'favorite',
      pageSize,
    },
  })

  return res.data
}

// productData: 상품 등록에 필요한 데이터 묶음 { name, description, price, tags }
async function createProduct(productData) {
  const res = await axios.post(PRODUCT_API_URL, productData)

  return res.data
}

export { getProducts, getBestProducts, createProduct }
