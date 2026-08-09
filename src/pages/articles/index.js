import { useEffect, useState } from "react";

import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/ArticleList.module.css";

// API 날짜를 연도.월.일 형식으로 변환
const formatDate = (dateString) => {
  const [date] = dateString.split("T");

  return date.replaceAll("-", ".");
};

// "/articles" 주소에서 보여줄 자유게시판 목록 페이지
export default function ArticleListPage() {

  // 검색창에 입력한 검색어 저장
  const [keyword, setKeyword] = useState("");
  // 드롭다운에서 선택한 정렬 기준 저장
  const [orderBy, setOrderBy] = useState("recent");

  // API에서 받은 전체 게시글 목록 저장
  const [articles, setArticles] = useState([]);

  // API에서 받은 베스트 게시글 목록 저장
  const [bestArticles, setBestArticles] = useState([]);

  // 게시글 목록 요청 진행 상태 저장
  const [isLoading, setIsLoading] = useState(true);

  // 게시글 목록 요청 오류 메시지 저장
  const [errorMessage, setErrorMessage] = useState("");

  // 페이지가 처음 나타날 때 게시글 목록 요청
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/api/articles", {
          params: {
            limit: 10,
          },
        });

        // API 데이터에 임시 닉네임과 좋아요 개수 추가
        const articleList = response.data.list.map((article) => ({
          ...article,
          nickname: `판다${article.id}`,
          likeCount: (article.id * 7) % 100,
        }));

        setArticles(articleList);
      } catch (error) {
        console.error("게시글 목록을 불러오지 못했습니다.", error);

        // API 요청 실패 시 화면에 표시할 메시지 저장
        setErrorMessage("게시글을 불러오지 못했습니다.");
      } finally {
        // API 요청 성공 여부와 관계없이 로딩 종료
        setIsLoading(false);
      }
    };

    // 최신 게시글 3개를 베스트 게시글로 요청
    const fetchBestArticles = async () => {
      try {
        const response = await axios.get("/api/articles", {
          params: {
            limit: 3,
          },
        });

        // API 데이터에 임시 닉네임과 좋아요 개수 추가
        const bestArticleList = response.data.list.map((article) => ({
          ...article,
          nickname: `판다${article.id}`,
          likeCount: (article.id * 7) % 100,
        }));

        setBestArticles(bestArticleList);
      } catch (error) {
        console.error("베스트 게시글을 불러오지 못했습니다.", error);
      }
    };

    fetchArticles();
    fetchBestArticles();
  }, []);

  // 제목에 검색어가 포함된 게시글만 추출
  const filteredArticles = articles.filter((article) =>
    article.title
      .toLowerCase()
      .includes(keyword.trim().toLowerCase()),
  );

  // 검색 결과 원본을 변경하지 않고 새로운 배열로 복사
  const sortedArticles = [...filteredArticles].sort((first, second) => {
    // 오래된순 선택 시 날짜가 빠른 게시글부터 정렬
    if (orderBy === "oldest") {
      return first.createdAt.localeCompare(second.createdAt);
    }

    // 기본값은 날짜가 최근인 게시글부터 정렬
    return second.createdAt.localeCompare(first.createdAt);
  });

  return (
    <>
      {/* 브라우저 탭 제목과 페이지 설명 설정 */}
      <Head>
        <title>자유게시판 | 판다마켓</title>
        <meta
          name="description"
          content="판다마켓 자유게시판의 게시글을 확인할 수 있습니다."
        />
      </Head>

      {/* 자유게시판 페이지의 전체 콘텐츠 영역 */}
      <main className={styles.page}>
        {/* 최신 게시글 3개를 표시할 베스트 게시글 영역 */}
        <section
          className={styles.section}
          aria-labelledby="best-articles-title"
        >
          <h1
            id="best-articles-title"
            className={styles.sectionTitle}
          >
            베스트 게시글
          </h1>

          {/* 임시 게시글 배열을 카드 목록으로 변환 */}
          <div className={styles.bestArticleList}>
            {bestArticles.map((article) => (
              <Link className={styles.bestArticleCard} href={`/articles/${article.id}`} key={article.id}>
                {/* 게시글 제목과 작성자 정보 영역 */}
                <div className={styles.bestArticleContent}>
                  <span className={styles.bestBadge}>BEST</span>

                  <h3 className={styles.bestArticleTitle}>{article.title}</h3>

                  {/* 베스트 게시글 작성자, 날짜, 좋아요 표시 */}
                  <div className={styles.bestArticleInfo}>
                    <span>{article.nickname}</span>
                    <span>{formatDate(article.createdAt)}</span>
                    <span>좋아요 {article.likeCount}</span>
                  </div>
                </div>

                {/* 모든 임시 게시글에 기본 이미지 적용 */}
                <Image
                  className={styles.bestArticleImage}
                  src="/img/img_default.svg"
                  alt="게시글 기본 이미지"
                  width={120}
                  height={120}
                />
              </Link>
            ))}
          </div>
        </section>

        {/* 검색과 정렬을 포함한 전체 게시글 목록 영역 */}
        <section
          className={styles.section}
          aria-labelledby="all-articles-title"
        >
          {/* 게시글 제목과 작성 버튼을 한 줄에 배치 */}
          <div className={styles.articleTitleRow}>
            <h2 className={styles.sectionTitle}>게시글</h2>

            {/* 페이지 이동 기능은 게시글 등록 페이지 생성 후 연결 */}
            <Link className={styles.writeButton} href="/articles/new">
              게시글 작성하기
            </Link>
          </div>

          {/* 게시글 검색창과 정렬 드롭다운 배치 */}
          <div className={styles.controls}>
            {/* 검색창과 접근성용 설명을 연결 */}
            <label className={styles.searchField}>
              <input
                className={styles.searchInput}
                type="search"
                name="keyword"
                aria-label="게시글 검색"
                placeholder="검색할 게시글을 입력해주세요"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </label>

            {/* 게시글 정렬 기준을 선택하는 드롭다운 */}
            <label className={styles.sortField}>
              <select
                className={styles.sortSelect}
                name="orderBy"
                aria-label="게시글 정렬"
                value={orderBy}
                onChange={(event) => setOrderBy(event.target.value)}
              >
                <option value="recent">최신순</option>
                <option value="oldest">오래된순</option>
              </select>
            </label>
          </div>

          {/* API 연결 전 레이아웃 확인용 임시 콘텐츠 */}
          {/* 전체 게시글 카드 구조 확인용 임시 데이터 */}
          {/* 임시 게시글 배열을 전체 게시글 카드로 변환 */}
          <div className={styles.articleList}>
            {/* 검색 결과 유무에 따라 안내 문구 또는 게시글 목록 표시 */}
            {isLoading ? (
              <p className={styles.emptyMessage}>게시글을 불러오는 중입니다.</p>
            ) : errorMessage ? (
              <p className={styles.emptyMessage}>{errorMessage}</p>
            ) : sortedArticles.length === 0 ? (
              <p className={styles.emptyMessage}>검색 결과가 없습니다.</p>
            ) : (
              sortedArticles.map((article) => (
                <Link className={styles.articleCard} href={`/articles/${article.id}`} key={article.id}>
                  {/* 게시글 제목과 작성자 정보 영역 */}
                  <div className={styles.articleContent}>
                    <h3 className={styles.articleTitle}>{article.title}</h3>

                    {/* 일반 게시글 작성자, 날짜, 좋아요 표시 */}
                    <div className={styles.articleInfo}>
                      <div className={styles.articleAuthor}>
                        <Image
                          className={styles.profileImage}
                          src="/img/ic_profile.svg"
                          alt=""
                          width={24}
                          height={24}
                        />
                        <span>{article.nickname}</span>
                      </div>

                      <span className={styles.articleDate}>
                        {formatDate(article.createdAt)}
                      </span>

                      <span className={styles.articleLike}>
                        좋아요 {article.likeCount}
                      </span>
                    </div>
                  </div>

                  {/* 이미지가 없는 게시글에 기본 이미지 적용 */}
                  <Image
                    className={styles.articleImage}
                    src="/img/img_default.svg"
                    alt="게시글 기본 이미지"
                    width={120}
                    height={120}
                  />
                </Link>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
}