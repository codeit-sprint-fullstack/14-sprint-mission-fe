// 자유게시판 목록 페이지(/articles)
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import ArticleList from "@/components/articles/ArticleList";
import { getArticles } from "@/lib/api/articles";
import { queryKeys } from "@/lib/queryKeys";
import styles from "@/styles/ArticlesPage.module.css";

function getStringQuery(value) {
  return typeof value === "string" ? value : "";
}

//페이지 렌더링 전 서버에서 실행하는 함수
// /articles 접속 -> 서버 실행 -> 데이터 가져오기 -> HTML 생성 -> 브라우저 전송
export default function ArticlesPage() {
  const router = useRouter();
  const keyword = getStringQuery(router.query.keyword).trim();
  const orderBy = getStringQuery(router.query.orderBy) || "recent";
  const listParams = { offset: 0, limit: 10, keyword, orderBy };
  const bestParams = { offset: 0, limit: 3, orderBy: "recent" };
  const articlesQuery = useQuery({
    queryKey: queryKeys.articles.list(listParams),
    queryFn: () => getArticles(listParams),
    enabled: router.isReady,
  });
  const bestArticlesQuery = useQuery({
    queryKey: queryKeys.articles.list(bestParams),
    queryFn: () => getArticles(bestParams),
  });
  const articles = articlesQuery.data?.list ?? [];
  const bestArticles = bestArticlesQuery.data?.list ?? [];
  const isLoading = articlesQuery.isPending || bestArticlesQuery.isPending;
  const error = articlesQuery.error ?? bestArticlesQuery.error;

  return (
    <>
      <Head>
        <title>자유게시판 | 판다마켓</title>
      </Head>
      <main className={styles.main}>
        {isLoading && <p className={styles.state}>게시글을 불러오는 중입니다.</p>}
        {error && <p className={styles.state}>게시글을 불러오지 못했습니다.</p>}
        <section className={styles.section}>
          <h1 className={`${styles.heading} ${styles.bestHeading}`}>
            베스트 게시글
          </h1>
          <ArticleList articles={bestArticles} variant="best" />
        </section>

        <section className={styles.section}>
          <div className={styles.listHeader}>
            <h2 className={`${styles.heading} ${styles.listHeading}`}>게시글</h2>
            <Link className={styles.writeLink} href="/articles/new">
              글쓰기
            </Link>
          </div>

          <form className={styles.controls} method="get">
            <div className={styles.searchField}>
              <svg
                className={styles.searchIcon}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M10.8966 16.2605C12.378 16.2605 13.6424 15.7401 14.6897 14.6992C15.7369 13.6584 16.2605 12.3908 16.2605 10.8966C16.2605 9.41507 15.7369 8.1507 14.6897 7.10345C13.6424 6.05619 12.378 5.53257 10.8966 5.53257C9.4023 5.53257 8.13474 6.05619 7.09387 7.10345C6.053 8.1507 5.53257 9.41507 5.53257 10.8966C5.53257 12.3908 6.053 13.6584 7.09387 14.6992C8.13474 15.7401 9.4023 16.2605 10.8966 16.2605ZM10.8966 17.7931C9.9387 17.7931 9.04151 17.6111 8.20498 17.2471C7.36845 16.8831 6.64049 16.3914 6.02107 15.772C5.40166 15.1526 4.90996 14.4246 4.54598 13.5881C4.18199 12.7516 4 11.8544 4 10.8966C4 9.95147 4.18199 9.06066 4.54598 8.22414C4.90996 7.38761 5.40166 6.65645 6.02107 6.03065C6.64049 5.40485 7.36845 4.90996 8.20498 4.54598C9.04151 4.18199 9.9387 4 10.8966 4C11.8416 4 12.7324 4.18199 13.569 4.54598C14.4055 4.90996 15.1367 5.40485 15.7625 6.03065C16.3883 6.65645 16.8831 7.38761 17.2471 8.22414C17.6111 9.06066 17.7931 9.95147 17.7931 10.8966C17.7931 11.7139 17.659 12.4866 17.3908 13.2146C17.1226 13.9425 16.7522 14.6066 16.2797 15.2069L18.7893 17.7165C18.9425 17.8697 19.016 18.0485 19.0096 18.2529C19.0032 18.4572 18.9234 18.636 18.7701 18.7893C18.6169 18.9298 18.4381 19 18.2337 19C18.0294 19 17.8506 18.9298 17.6973 18.7893L15.1877 16.2989C14.5875 16.7714 13.9234 17.1386 13.1954 17.4004C12.4674 17.6622 11.7011 17.7931 10.8966 17.7931Z"
                  fill="#9CA3AF"
                />
              </svg>
              <input
                className={styles.searchInput}
                type="search"
                name="keyword"
                defaultValue={keyword}
                placeholder="검색할 상품을 입력해주세요"
                aria-label="게시글 검색어"
              />
            </div>
            <div className={styles.selectField}>
              <select
                className={styles.select}
                name="orderBy"
                defaultValue={orderBy}
                aria-label="게시글 정렬"
              >
                <option value="recent">최신순</option>
              </select>
              <svg
                className={styles.selectIcon}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12.7151 15.4653C12.3975 15.7654 11.9008 15.7654 11.5832 15.4653L5.8047 10.006C5.26275 9.49404 5.6251 8.58286 6.37066 8.58286L17.9276 8.58286C18.6732 8.58286 19.0355 9.49404 18.4936 10.006L12.7151 15.4653Z"
                  fill="#1F2937"
                />
              </svg>
              <svg
                className={styles.mobileSelectIcon}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M15 6.5V17.5M18.5 14L15 17.5L11.5 14"
                  stroke="#1F2937"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.90039 15.5L9.50039 15.5"
                  stroke="#1F2937"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M5 7.5H10"
                  stroke="#1F2937"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M6.2998 11.5L9.4998 11.5"
                  stroke="#1F2937"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <button className={styles.visuallyHidden} type="submit">
              검색
            </button>
          </form>

          <ArticleList articles={articles} />
        </section>
      </main>
    </>
  );
}
