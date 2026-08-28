import { infiniteQueryOptions } from '@tanstack/react-query'
import { getProductComments } from '@/api/commentApi'
import { getProductCommentsQueryKey } from '@/constants/queryKeys'

const COMMENT_STALE_TIME = 60 * 1000
const COMMENT_GC_TIME = 5 * 60 * 1000

function getProductCommentsQueryOptions({ itemId, limit }) {
  return infiniteQueryOptions({
    queryKey: getProductCommentsQueryKey({
      itemId,
      limit,
    }),
    queryFn: ({ pageParam }) =>
      getProductComments({
        productId: itemId,
        limit,
        cursor: pageParam,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: COMMENT_STALE_TIME,
    gcTime: COMMENT_GC_TIME,
    refetchOnWindowFocus: true,
    retry: (failureCount, error) => {
      const isClientError = error.status >= 400 && error.status < 500

      if (isClientError) {
        return false
      }

      return failureCount < 3
    },
  })
}

export { getProductCommentsQueryOptions }
