import { useState } from "react";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>판다마켓</title>
        <meta name="description" content="판다마켓 자유게시판" />
      </Head>

      <div className="site-wrapper">
        <Header />

        <main className="page-content">
          <Component {...pageProps} />
        </main>

        <Footer />
      </div>
    </QueryClientProvider>
  );
}
