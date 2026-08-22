import { createArticle } from "@/actions/articleActions";
import ArticleForm from "@/app/articles/_components/ArticleForm";
import styles from "./page.module.css";

export default function ArticleCreate() {
  return (
    <div className={styles.wrapper}>
      <ArticleForm action={createArticle} />
    </div>
  );
}
