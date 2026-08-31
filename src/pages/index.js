import Head from "next/head";

import HeroSection from "@/components/HeroSection";
import HotItem from "@/components/HotItem";
import SearchSection from "@/components/SearchSection";
import SalesSection from "@/components/SalesSection";
import BottomBanner from "@/components/BottomBanner";
import Footer from "@/components/Footer";

// "/" 주소로 접속했을 때 보여주는 메인 페이지 컴포넌트
export default function Home() {
  return (
    <>
      {/* 브라우저 탭의 제목과 페이지 정보를 설정 */}
      <Head>
        <title>판다마켓</title>
        <meta
          name="description"
          content="판다마켓"
        />
      </Head>

      <main>
        <HeroSection />
        <HotItem />
        <SearchSection />
        <SalesSection />
        <BottomBanner />
        <Footer />
      </main>
    </>
  );
}