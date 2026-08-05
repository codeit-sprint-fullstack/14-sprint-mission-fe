import ArticleForm from '@/components/form/ArticleForm';
import { createArticle } from '@/actions/articleActions';
import styles from './page.module.css';

export default function ArticleCreate() {
  return (
    <ArticleForm 
      action={createArticle} 
    />
  )
}