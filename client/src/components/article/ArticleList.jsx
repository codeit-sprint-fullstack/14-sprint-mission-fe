import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles = []}) {
  if (articles.length === 0) {
    return <p>게시글이 없습니다.</p>;
  }

  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleCard article={article}/>
        </li>
      ))}
    </ul>
  )
}