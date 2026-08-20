import { queryOptions } from '@tanstack/react-query'
import {
  getBestProducts,
  getProducts,
  getProductDetail,
} from '@/api/productApi'
import {
  getBestProductQueryKey,
  getProductListQueryKey,
  getProductDetailQueryKey,
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

function getProductDetailQueryOptions(itemId) {
  return queryOptions({
    queryKey: getProductDetialQueryKey(itemId),
    queryFn: () => getProductDetail(itemId),
    staleTime: PRODUCT_STALE_TIME,
    gcTime: PRODUCT_GC_TIME,
    refetchOnWindowFocus: true,
    retry: (failureCount, error) => {
      if (error.status === 401 || error.status === 404) {
        return false
      }

      // 401, 404 외의 에러는 재시도를 3회까지 허용
      // 첫 재시도 여부를 판단할 때 failureCount는 0부터 시작
      // 0, 1, 2에서 true를 반환하므로 총 3회 재시도
      return failureCount < 3
    },
  })
}

export {
  getBestProductQueryOptions,
  getProductListQueryOptions,
  getProductDetailQueryOptions,
}
