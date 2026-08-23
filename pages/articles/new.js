//게시글 작성 페이지
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import ArticleForm from "@/components/articles/ArticleForm";
import useHasAccessToken from "@/hooks/useHasAccessToken";
import { createArticle } from "@/lib/api/articles";
import { queryKeys } from "@/lib/queryKeys";
import styles from "@/styles/ArticleFormPage.module.css";

export default function NewArticlePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const hasToken = useHasAccessToken();

  useEffect(() => {
    if (!router.isReady || hasToken) return;

    router.replace(`/signin?redirect=${encodeURIComponent(router.asPath)}`);
  }, [hasToken, router]);

  const createMutation = useMutation({
    mutationFn: createArticle,
    onSuccess: async (createdArticle) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
      await router.push(`/articles/${encodeURIComponent(createdArticle.id)}`);
    },
  });

  const handleSubmit = (article) => createMutation.mutateAsync(article);

  if (!hasToken) {
    return (
      <main className={styles.main}>로그인 페이지로 이동하는 중입니다.</main>
    );
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
