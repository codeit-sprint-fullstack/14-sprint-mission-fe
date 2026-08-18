const PRODUCT_QUERY_KEY = 'products'
const USER_QUERY_KEY = 'user'

function getProductListQueryKey({ orderBy, keyword, page, pageSize }) {
  return [
    PRODUCT_QUERY_KEY,
    'list',
    {
      orderBy,
      keyword,
      page,
      pageSize,
    },
  ]
}

function getBestProductQueryKey({ pageSize }) {
  return [PRODUCT_QUERY_KEY, 'best', { pageSize }]
}

function getUserProfileQueryKey() {
  return [USER_QUERY_KEY, 'profile']
}

export {
  getProductListQueryKey,
  getBestProductQueryKey,
  getUserProfileQueryKey,
}
