import BestArticleCard from "./BestArticleCard";
import styles from "./BestArticleList.module.css";

export default function BestArticleList({ articles = [] }) {
  if (articles.length === 0) {
    return <p>게시글이 없습니다.</p>;
  }

  return (
    <ul className={styles.articleList}>
      {articles.map((article) => (
        <li key={article.id}>
          <BestArticleCard article={article} />
        </li>
      ))}
    </ul>
  );
}
