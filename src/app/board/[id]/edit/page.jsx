import ArticleForm from '../../../../components/ArticleForm';

export default async function ArticleEditPage({ params }) {
  const { id } = await params;

  return <ArticleForm articleId={id} />;
}
