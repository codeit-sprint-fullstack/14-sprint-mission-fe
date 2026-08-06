//게시글 상세페이지
import Head from "next/head";
import Link from "next/link";

import ArticleDetail from "@/components/articles/ArticleDetail";
import CommentSection from "@/components/articles/CommentSection";
import { getArticle, getArticleComments } from "@/lib/api/articles";
import styles from "@/styles/ArticleDetailPage.module.css";

//게시글 id 가져오기
export async function getServerSideProps({ params }) {
  //게시글 조회
  const article = await getArticle(params.id);

  if (!article) {
    return { notFound: true };
  }

  //댓글 조회
  const commentsData = await getArticleComments(article.id);

  //props 반환 ( 데이터를 페이지로 전달 )
  return {
    props: {
      article,
      initialComments: commentsData.list ?? [],
    },
  };
}

export default function ArticleDetailPage({ article, initialComments }) {
  return (
    <>
      <Head>
        <title>{article.title} | 판다마켓</title>
      </Head>

      <main className={styles.main}>
        <ArticleDetail article={article} />
        <CommentSection
          articleId={article.id}
          initialComments={initialComments}
        />
        <Link className={styles.backLink} href="/articles">
          목록으로 돌아가기
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6.0332 3.6C5.53615 3.6 5.1332 4.00294 5.1332 4.5C5.1332 4.99706 5.53615 5.4 6.0332 5.4V3.6ZM6.0332 5.4H16.1665V3.6H6.0332V5.4ZM20.5999 9.83333V10.9H22.3999V9.83333H20.5999ZM16.1665 15.3333H6.0332V17.1333H16.1665V15.3333ZM20.5999 10.9C20.5999 13.3485 18.615 15.3333 16.1665 15.3333V17.1333C19.6091 17.1333 22.3999 14.3426 22.3999 10.9H20.5999ZM16.1665 5.4C18.615 5.4 20.5999 7.38487 20.5999 9.83333H22.3999C22.3999 6.39076 19.6091 3.6 16.1665 3.6V5.4Z"
              fill="white"
            />
            <path
              d="M2.5 16.2333L9.7 12.5383L9.7 19.9284L2.5 16.2333Z"
              fill="white"
            />
          </svg>
        </Link>
      </main>
    </>
  );
}
