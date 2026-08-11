import ArticleCard from "@/components/boards/ArticleCard/ArticleCard";
import BestArticleCard from "@/components/boards/BestArticleCard/BestArticleCard";
import BoardSearchForm from "@/components/boards/BoardSearchForm/BoardSearchForm";
import BoardSortDropdown from "@/components/boards/BoardSortDropdown/BoardSortDropdown";
import Button from "@/components/Button/Button";
import { DEFAULT_LIKE_COUNT, DEFAULT_NICKNAME } from "@/constants/board";
import { getArticles } from "@/lib/articleApi";
import { formatDate } from "@/lib/dateUtils";
import styles from "./page.module.css";

export default async function BoardsPage({ searchParams }) {
  const { keyword = "", sort = "recent" } = await searchParams;

  const [{ list: articleList }, { list: bestArticleList }] = await Promise.all([
    getArticles({ keyword }),
    getArticles({ limit: 3 }),
  ]);

  const sortedArticleList =
    sort === "recent"
      ? [...articleList].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
      : articleList;

  const articles = sortedArticleList.map((article) => ({
    ...article,
    nickname: DEFAULT_NICKNAME,
    likeCount: DEFAULT_LIKE_COUNT,
    createdAt: formatDate(article.createdAt),
  }));

  const bestArticles = bestArticleList.map((article) => ({
    ...article,
    nickname: DEFAULT_NICKNAME,
    likeCount: DEFAULT_LIKE_COUNT,
    createdAt: formatDate(article.createdAt),
  }));

  return (
    <div className={styles.page}>
      <section className={styles.bestSection}>
        <h1 className={styles.bestTitle}>베스트 게시글</h1>

        <div className={styles.bestList}>
          {bestArticles.map((article) => (
            <BestArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className={styles.articleSection}>
        <div className={styles.articleHeader}>
          <h2 className={styles.articleTitle}>게시글</h2>
          <Button href={"/boards/new"}>글쓰기</Button>
        </div>

        <div className={styles.articleControls}>
          <BoardSearchForm initialKeyword={keyword} />

          <BoardSortDropdown defaultValue={sort} />
        </div>

        <div className={styles.articleList}>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
