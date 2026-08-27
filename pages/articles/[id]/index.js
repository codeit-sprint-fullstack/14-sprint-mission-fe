import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import ArticleDetail from "@/components/articles/ArticleDetail";
import CommentSection from "@/components/articles/CommentSection";
import useHasAccessToken from "@/hooks/useHasAccessToken";
import { getArticle } from "@/lib/api/articles";
import { queryKeys } from "@/lib/queryKeys";
import styles from "@/styles/ArticleDetailPage.module.css";

export default function ArticleDetailPage() {
  const router = useRouter();
  const hasToken = useHasAccessToken();
  const articleId =
    router.isReady && typeof router.query.id === "string" ? router.query.id : "";

  useEffect(() => {
    if (!router.isReady || hasToken) return;

    router.replace(`/signin?redirect=${encodeURIComponent(router.asPath)}`);
  }, [hasToken, router]);

  const articleQuery = useQuery({
    queryKey: queryKeys.articles.detail(articleId),
    queryFn: () => getArticle(articleId),
    enabled: Boolean(articleId) && hasToken,
  });

  if (!hasToken) {
    return (
      <main className={styles.main}>
        <p className={styles.error}>로그인 페이지로 이동하는 중입니다.</p>
      </main>
    );
  }

  if (articleQuery.isPending) {
    return (
      <main className={styles.main}>
        <p className={styles.error}>게시글을 불러오는 중입니다.</p>
      </main>
    );
  }

  if (articleQuery.isError) {
    return (
      <main className={styles.main}>
        <p className={styles.error}>게시글을 불러오지 못했습니다.</p>
      </main>
    );
  }

  const article = articleQuery.data;

  if (!article) {
    return (
      <main className={styles.main}>
        <p className={styles.error}>존재하지 않는 게시글입니다.</p>
        <Link className={styles.backLink} href="/articles">
          목록으로 돌아가기
        </Link>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>{article.title} | 판다마켓</title>
      </Head>

      <main className={styles.main}>
        <ArticleDetail article={article} />
        <CommentSection articleId={article.id} />
        <Link className={styles.backLink} href="/articles">
          목록으로 돌아가기
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6.0332 3.6C5.53615 3.6 5.1332 4.00294 5.1332 4.5C5.1332 4.99706 5.53615 5.4 6.0332 5.4V3.6ZM6.0332 5.4H16.1665V3.6H6.0332V5.4ZM20.5999 9.83333V10.9H22.3999V9.83333H20.5999ZM16.1665 15.3333H6.0332V17.1333H16.1665V15.3333ZM20.5999 10.9C20.5999 13.3485 18.615 15.3333 16.1665 15.3333V17.1333C19.6091 17.1333 22.3999 14.3426 22.3999 10.9H20.5999ZM16.1665 5.4C18.615 5.4 20.5999 7.38487 20.5999 9.83333H22.3999C22.3999 6.39076 19.6091 3.6 16.1665 3.6V5.4Z" fill="white" />
            <path d="M2.5 16.2333L9.7 12.5383L9.7 19.9284L2.5 16.2333Z" fill="white" />
          </svg>
        </Link>
      </main>
    </>
  );
}
