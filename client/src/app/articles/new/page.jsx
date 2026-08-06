import ArticleForm from '@/components/article/ArticleForm';
import { createArticle } from '@/actions/articleActions';

export default function ArticleCreate() {
  return (
    <ArticleForm 
      action={createArticle} 
    />
  )
}