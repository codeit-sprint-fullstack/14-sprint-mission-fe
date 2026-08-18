import { queryOptions } from '@tanstack/react-query'
import { getBestProducts, getProducts } from '@/api/productApi'
import {
  getBestProductQueryKey,
  getProductListQueryKey,
} from '@/constants/queryKeys'

const PRODUCT_STALE_TIME = 60 * 1000
const PRODUCT_GC_TIME = 5 * 60 * 1000

function getProductListQueryOptions(params) {
  return queryOptions({
    queryKey: getProductListQueryKey(params),
    queryFn: () => getProducts(params),
    staleTime: PRODUCT_STALE_TIME,
    gcTime: PRODUCT_GC_TIME,
    refetchOnWindowFocus: true,
  })
}

function getBestProductQueryOptions(params) {
  return queryOptions({
    queryKey: getBestProductQueryKey(params),
    queryFn: () => getBestProducts(params),
    staleTime: PRODUCT_STALE_TIME,
    gcTime: PRODUCT_GC_TIME,
    refetchOnWindowFocus: true,
  })
}

export { getBestProductQueryOptions, getProductListQueryOptions }
