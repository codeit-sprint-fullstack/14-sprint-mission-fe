import ArticleCard from "./ArticleCard";
import styles from "./ArticleList.module.css";

export default function ArticleList({ articles = [] }) {
  if (articles.length === 0) {
    return <p>게시글이 없습니다.</p>;
  }

  return (
    <ul className={styles.articleList}>
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleCard article={article} />
        </li>
      ))}
    </ul>
  );
}
