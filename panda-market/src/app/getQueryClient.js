import { environmentManager, QueryClient } from '@tanstack/react-query'

// 새로운 QueryClient 생성
function makeQueryClient() {
  return new QueryClient()
}

let browserQueryClient

function getQueryClient() {
  // 서버에서는 요청마다 새로운 QueryClient 반환
  if (environmentManager.isServer()) {
    return makeQueryClient()
  }

  // 브라우저 최초 실행 시 QueryClient 생성 후 저장
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient()
  }

  // 브라우저에서는 저장된 QueryClient 재사용
  return browserQueryClient
}

export { getQueryClient }
