import Link from "next/link";

export default function ArticleList({ articles = [] }) {
  if (articles.length === 0) {
    return <p>게시글이 없습니다.</p>;
  }

  return (
    <ul>
      {articles.map((articles) => (
        <Link key={articles.id} href={`/board/${articles.id}`}>
          <div>
            <span>{articles.title}</span>
          </div>
        </Link>
      ))}
    </ul>
  );
}
