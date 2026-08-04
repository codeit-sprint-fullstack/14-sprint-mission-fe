import Head from "next/head";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <meta name="description" content="판다마켓 자유게시판" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
