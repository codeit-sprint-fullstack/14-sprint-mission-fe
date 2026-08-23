import { useState } from "react";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import Header from "@/components/Header";

import "@/styles/colors.css";
import "@/styles/globals.css";

// Next.js의 모든 페이지를 감싸는 최상위 App 컴포넌트
export default function App({ Component, pageProps }) {
  // React Query가 사용할 QueryClient를 생성함
  const [queryClient] = useState(
    () => new QueryClient(),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Header />

      {/* 현재 주소에 해당하는 페이지 컴포넌트를 화면에 표시함 */}
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}