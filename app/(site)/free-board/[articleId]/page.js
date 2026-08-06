import { cache } from 'react';
import ArticleDetailView from '@/components/ArticleDetailView';
import { getArticle } from '@/lib/external-api';

export const dynamic = 'force-dynamic';

const getCachedArticle = cache((articleId) => getArticle(articleId));

export async function generateMetadata({ params }) {
  const { articleId } = await params;
  const article = await getCachedArticle(articleId);
  if (!article) return { title: '게시글을 찾을 수 없습니다' };
  return { title: article.title, description: article.content.slice(0, 120) };
}

export default async function ArticleDetailPage({ params }) {
  const { articleId } = await params;
  return <ArticleDetailView articleId={articleId} />;
}
