// next에서 QueryClientProdvier를 사용하려면
// use client를 선언해야 함
// layout.jsx 전체가 클라이언트 컴포넌트화되기 때문에
// QueryProdvider를 클라이언트 컴포넌트로 따로 분리하기

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}