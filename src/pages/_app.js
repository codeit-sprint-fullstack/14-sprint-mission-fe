import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

const AUTH_PATHS = ["/signin", "/signup"];

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());
  const isAuthPage = AUTH_PATHS.includes(router.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>판다마켓</title>
        <meta name="description" content="판다마켓 자유게시판" />
      </Head>

      <div className="site-wrapper">
        {!isAuthPage && <Header />}

        <main className="page-content">
          <Component {...pageProps} />
        </main>

        {!isAuthPage && <Footer />}
      </div>
    </QueryClientProvider>
  );
}
