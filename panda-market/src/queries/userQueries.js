import { queryOptions } from '@tanstack/react-query'
import { getUserProfile } from '@/api/userApi'
import { getUserProfileQueryKey } from '@/constants/queryKeys'

const USER_STALE_TIME = 60 * 1000
const USER_GC_TIME = 5 * 60 * 1000

function getUserProfileQueryOptions() {
  return queryOptions({
    queryKey: getUserProfileQueryKey(),
    queryFn: getUserProfile,
    staleTime: USER_STALE_TIME,
    gcTime: USER_GC_TIME,
    refetchOnWindowFocus: true,
    // 유효하지 않은 토큰으로 같은 요청을 반복해도 성공하지 않기 때문에 자동 재시도하지 않도록 설계
    retry: false,
  })
}

export { getUserProfileQueryOptions }
