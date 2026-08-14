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

export { getProducts, getBestProducts }
