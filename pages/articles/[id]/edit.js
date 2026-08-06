import Head from "next/head";
import { useRouter } from "next/router";

import ArticleForm from "@/components/articles/ArticleForm";
import { getArticle, updateArticle } from "@/lib/api/articles";
import styles from "@/styles/ArticleFormPage.module.css";

export async function getServerSideProps({ params }) {
  const article = await getArticle(params.id);

  if (!article) {
    return { notFound: true };
  }

  return { props: { article } };
}

export default function EditArticlePage({ article }) {
  const router = useRouter();

  async function handleSubmit(updatedArticle) {
    await updateArticle(article.id, updatedArticle);
    await router.push(`/articles/${encodeURIComponent(article.id)}`);
  }

  return (
    <>
      <Head>
        <title>게시글 수정 | 판다마켓</title>
      </Head>
      <main className={styles.main}>
        <ArticleForm
          initialTitle={article.title}
          initialContent={article.content}
          heading="게시글 수정"
          submitLabel="수정"
          onSubmit={handleSubmit}
        />
      </main>
    </>
  );
}
