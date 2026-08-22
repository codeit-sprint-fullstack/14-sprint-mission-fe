const PRODUCT_API_URL = 'https://panda-market-api.vercel.app/products'

async function getProductComments({ productId, limit, cursor }) {
  const url = new URL(`${PRODUCT_API_URL}/${productId}/comments`)

  url.searchParams.set('limit', String(limit))

  if (cursor != null) {
    url.searchParams.set('cursor', String(cursor))
  }

  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error(`댓글 목록을 불러오지 못했습니다 (${res.status})`)

    error.status = res.status

    throw error
  }

  return res.json()
}

export { getProductComments }
