import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import ArticleForm from "@/components/articles/ArticleForm";
import { getArticle, updateArticle } from "@/lib/api/articles";
import { queryKeys } from "@/lib/queryKeys";
import styles from "@/styles/ArticleFormPage.module.css";

export default function EditArticlePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const articleId =
    router.isReady && typeof router.query.id === "string" ? router.query.id : "";

  const articleQuery = useQuery({
    queryKey: queryKeys.articles.detail(articleId),
    queryFn: () => getArticle(articleId),
    enabled: Boolean(articleId),
  });

  const updateMutation = useMutation({
    mutationFn: (updatedArticle) => updateArticle(articleId, updatedArticle),
    onSuccess: async (updatedArticle) => {
      queryClient.setQueryData(
        queryKeys.articles.detail(articleId),
        updatedArticle,
      );
      await queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
      await router.push(`/articles/${encodeURIComponent(articleId)}`);
    },
  });

  if (articleQuery.isPending) {
    return <main className={styles.main}>게시글을 불러오는 중입니다.</main>;
  }

  if (articleQuery.isError || !articleQuery.data) {
    return <main className={styles.main}>게시글을 불러오지 못했습니다.</main>;
  }

  const article = articleQuery.data;

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
          onSubmit={(updatedArticle) => updateMutation.mutateAsync(updatedArticle)}
        />
      </main>
    </>
  );
}
