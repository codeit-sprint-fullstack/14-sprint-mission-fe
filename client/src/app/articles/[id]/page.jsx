import ArticleMenu from "@/components/ArticleMenu";

export default async function ArticleDetail({ params }) {
  const { id } = await params;

  const res = await fetch(`${process.env.API_BASE_URL}/articles/${id}`, 
    { cache: 'no-store'}
  )
  if (!res.ok) {
    throw new Error('게시글을 불러오는 데 실패했습니다');
  }
  const article = await res.json();

  return (
    <div>
      <div>
        <h1>{article.title}</h1>
        <ArticleMenu articleId={article.id}/>
      </div>

      <p>{article.content}</p>
    </div>
  )
}