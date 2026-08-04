import ArticleForm from '@/components/form/ArticleForm';
import { createArticle } from '@/actions/articleActions';

export default function ArticleCreate() {
  return (
    <ArticleForm 
      action={createArticle} 
    />
  )
}