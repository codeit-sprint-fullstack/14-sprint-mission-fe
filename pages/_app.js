//모든 페이지에 공통으로 적용되는 최상위 컴포넌트
import "@/styles/globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import styles from "@/styles/App.module.css";

export default function App({ Component, pageProps }) {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.content}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
