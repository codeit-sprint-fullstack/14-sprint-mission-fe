export default async function ArticleDetail({ params }) {
  const { id } = await params;

  const res = await fetch(`${process.env.API_BASE_URL}/articles/${id}`, 
    { cache: 'no-store'}
  )
  const article = await res.json();

  return (
    <div>
      <h1>게시글 상세 페이지</h1>
      <p>{article.title}</p>
      <p>{article.content}</p>
    </div>
  )
}