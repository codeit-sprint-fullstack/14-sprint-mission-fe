import ArticleRegistrationForm from '@/components/ArticleRegistrationForm';

export const metadata = {
  title: '게시글 작성',
};

export default function ArticleRegistrationPage() {
  return (
    <main className="article-form-main">
      <ArticleRegistrationForm />
    </main>
  );
}
