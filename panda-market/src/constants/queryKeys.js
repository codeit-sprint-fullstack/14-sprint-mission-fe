const PRODUCT_QUERY_KEY = 'products'
const USER_QUERY_KEY = 'user'

function getProductListRootQueryKey() {
  return [PRODUCT_QUERY_KEY, 'list']
}

function getProductListQueryKey({ orderBy, keyword, page, pageSize }) {
  return [
    ...getProductListRootQueryKey(),
    {
      orderBy,
      keyword,
      page,
      pageSize,
    },
  ]
}

function getBestProductRootQueryKey() {
  return [PRODUCT_QUERY_KEY, 'best']
}

function getBestProductQueryKey({ pageSize }) {
  return [...getBestProductRootQueryKey(), { pageSize }]
}

function getProductDetailRootQueryKey() {
  return [PRODUCT_QUERY_KEY, 'detail']
}

function getProductDetailQueryKey(itemId) {
  return [...getProductDetailRootQueryKey(), itemId]
}

function getUserProfileQueryKey() {
  return [USER_QUERY_KEY, 'profile']
}

export {
  getProductListRootQueryKey,
  getProductListQueryKey,
  getBestProductRootQueryKey,
  getBestProductQueryKey,
  getProductDetailRootQueryKey,
  getProductDetailQueryKey,
  getUserProfileQueryKey,
}
