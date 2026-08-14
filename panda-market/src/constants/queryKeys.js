const PRODUCT_QUERY_KEY = 'products'

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

export { getProductListQueryKey, getBestProductQueryKey }
