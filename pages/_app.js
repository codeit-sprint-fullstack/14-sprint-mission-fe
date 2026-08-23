//모든 페이지에 공통으로 적용되는 최상위 컴포넌트
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@/styles/globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import styles from "@/styles/App.module.css";

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 30 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  const hideLayout = Component.hideLayout ?? false;

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.app}>
        {!hideLayout && <Header />}

        <main className={styles.content}>
          <Component {...pageProps} />
        </main>

        {!hideLayout && <Footer />}
      </div>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
