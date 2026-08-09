import Head from "next/head";

// "/" 주소로 접속했을 때 보여주는 메인 페이지 컴포넌트
export default function Home() {
  return (
    <>
      {/* 브라우저 탭의 제목과 페이지 정보를 설정 */}
      <Head>
        <title>판다마켓</title>
        <meta
          name="description"
          content="판다마켓 자유게시판 미션 페이지"
        />
      </Head>

      {/* 임시 메인페이지 */}
      <main>
        <h1>판다마켓</h1>
        <p>판다마켓 임시 메인페이지</p>
      </main>
    </>
  );
}