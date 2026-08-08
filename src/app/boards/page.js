import BestArticleCard from "@/components/boards/BestArticleCard/BestArticleCard";
import Dropdown from "@/components/Dropdown/Dropdown";
import styles from "./page.module.css";
import ArticleCard from "@/components/boards/ArticleCard/ArticleCard";
import Button from "@/components/Button/Button";
import { getArticles } from "@/lib/articleApi";
import { formatDate } from "@/lib/dateUtils";
import BoardSearchForm from "@/components/boards/BoardSearchForm/BoardSearchForm";

export default async function BoardsPage({ searchParams }) {
  const { keyword = "" } = await searchParams;

  const { list: articleList } = await getArticles(keyword);
  const { list: bestArticleList } = await getArticles();

  const articles = articleList.map((article) => ({
    ...article,
    nickname: "잘하고 싶다",
    likeCount: 7777,
    createdAt: formatDate(article.createdAt),
  }));

  const bestArticles = bestArticleList.slice(0, 3).map((article) => ({
    ...article,
    nickname: "잘하고 싶다",
    likeCount: 7777,
    createdAt: formatDate(article.createdAt),
  }));

  const sortOptions = [{ label: "최신순", value: "recent" }];

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

          <Dropdown options={sortOptions} defaultValue="recent" />
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
