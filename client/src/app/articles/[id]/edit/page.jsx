import ArticleForm from '@/components/form/ArticleForm';
import { updateArticle } from '@/actions/articleActions';

export default async function EditArticle({ params }) {
  const { id } = await params;

  const res = await fetch(`${process.env.API_BASE_URL}/articles/${id}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('게시글을 불러오지 못했습니다.');
  }

  const article = await res.json();

  // AI로 문제 해결: updateArticle을 바로 호출해 FormData가 전달되지 않던 문제
  // Server Action에 id만 미리 전달하도록 bind 사용
  const updateArticleWithId = updateArticle.bind(null, id);

  return (
    <div>
      <ArticleForm
        action={updateArticleWithId}
        initialTitle={article.title}
        initialContent={article.content}
        submitText='수정'
      />
    </div>
  )
}