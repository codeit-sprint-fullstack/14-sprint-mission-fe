export default async function ArticleDetail({ params }) {
  const { id } = await params;
  const res = await fetch(
    `https://one4-sprint-mission-prisma.onrender.com/articles/${id}`,
    { cache: "no-store" },
  );

  const article = await res.json();

  return (
    <div>
      <h1>{article.title}</h1>
      <span>{article.content}</span>
    </div>
  );
}
