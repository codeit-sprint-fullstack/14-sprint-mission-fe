import ArticleList from "./_components/ArticleList";
import BestArticleList from "./_components/BestArticleList";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/SearchInput";
import Link from "next/link";
import styles from "./page.module.css";
import Pagination from "@/components/Pagination";

export default async function Articles({ searchParams }) {
  // 베스트 게시글 가져오기
  const bestRes = await fetch(
    `${process.env.API_BASE_URL}/articles?limit=3&sort=recent`,
    { cache: "no-store" }
  );
  if (!bestRes.ok) {
    throw new Error("게시글을 불러오는 데 실패했습니다");
  }
  const bestData = await bestRes.json();
  const bestArticles = bestData.list;

  // searchParams로 url의 쿼리스트링 꺼내기
  const params = await searchParams;
  const keyword = params.keyword ?? "";
  const sort = params.orderBy ?? "recent";
  const page = Number(params.page ?? 1);
  const pageSize = 4;
  const offset = (page - 1) * pageSize;

  // 일반 게시글 가져오기
  const res = await fetch(
    `${process.env.API_BASE_URL}/articles?offset=${offset}&limit=${pageSize}&keyword=${keyword}&sort=${sort}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("게시글을 불러오는 데 실패했습니다");
  }
  const data = await res.json();
  const articles = data.list;
  const totalCount = data.totalCount;

  // 페이지네이션
  const totalPages = Math.ceil(totalCount / pageSize); // 필요한 총 페이지 수 구하기
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1); // 페이지 배열 만들기 (1, 2... N)

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.section}>
        <h1 className={styles.bestSectionTitle}>베스트 게시글</h1>
        <BestArticleList articles={bestArticles} />
      </header>
      <section className={styles.section}>
        <div className={styles.articleSectionHeader}>
          <h2 className={styles.articleSectionTitle}>게시글</h2>
          <Link href="/articles/new" className={styles.createArticleLink}>
            글쓰기
          </Link>
        </div>
        <div className={styles.controllers}>
          <Input placeholder="검색어를 입력해주세요" route="/articles" />
          <Dropdown route="/articles" />
        </div>
        <ArticleList articles={articles} />
        <div>
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            pageNumbers={pageNumbers}
            route='articles'
          />
        </div>
      </section>
    </div>
  );
}
