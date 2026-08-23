import Header from "@/components/Header";
import "@/styles/colors.css";
import "@/styles/globals.css";

// Next.js의 모든 페이지를 감싸는 최상위 App 컴포넌트
export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Header는 페이지가 바뀌어도 모든 화면에서 공통으로 표시됨 */}
      <Header />

      {/* 현재 주소에 해당하는 페이지 컴포넌트를 화면에 표시함 */}
      <Component {...pageProps} />
    </>
  );
}