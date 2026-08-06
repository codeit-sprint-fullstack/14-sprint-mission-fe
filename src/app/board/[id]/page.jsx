import ArticleDetail from '../../../components/ArticleDetail';

export default async function ArticleDetailPage({ params }) {
  const { id } = await params;

  return <ArticleDetail articleId={id} />;
}
