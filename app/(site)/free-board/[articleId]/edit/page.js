import ArticleRegistrationForm from '@/components/ArticleRegistrationForm';

export const metadata = {
  title: '게시글 수정',
};

export default async function ArticleEditPage({ params }) {
  const { articleId } = await params;

  return (
    <main className="article-form-main">
      <ArticleRegistrationForm mode="edit" articleId={articleId} />
    </main>
  );
}
