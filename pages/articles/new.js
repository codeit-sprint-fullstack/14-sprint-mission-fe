//게시글 작성 페이지
import Head from "next/head";
import { useRouter } from "next/router";

import ArticleForm from "@/components/articles/ArticleForm";
import { createArticle } from "@/lib/api/articles";
import styles from "@/styles/ArticleFormPage.module.css";

export default function NewArticlePage() {
  const router = useRouter();

  async function handleSubmit(article) {
    const createdArticle = await createArticle(article);
    await router.push(`/articles/${encodeURIComponent(createdArticle.id)}`);
  }

  return (
    <>
      <Head>
        <title>게시글 쓰기 | 판다마켓</title>
      </Head>
      <main className={styles.main}>
        <ArticleForm onSubmit={handleSubmit} />
      </main>
    </>
  );
}
