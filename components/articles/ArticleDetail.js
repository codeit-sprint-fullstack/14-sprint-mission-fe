//게시글 상세페이지 게시글 담당(게시글 제목, 작성자, 작성일, 본문, 수정, 삭제)
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { deleteArticle } from "@/lib/api/articles";
import { formatDate, getMockMetadata } from "@/lib/articles/presentation";
import styles from "@/styles/ArticleDetailPage.module.css";
import HeartIcon from "./HeartIcon";

export default function ArticleDetail({ article }) {
  const router = useRouter();
  const { nickname, likeCount } = getMockMetadata(article.id);
  const [error, setError] = useState("");

  async function handleDeleteArticle() {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) {
      return;
    }

    setError("");

    try {
      await deleteArticle(article.id);
      await router.push("/articles");
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  return (
    <>
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{article.title}</h1>
          <details className={styles.articleMenu}>
            <summary aria-label="게시글 메뉴">⋮</summary>
            <div className={styles.menuPanel}>
              <Link href={`/articles/${encodeURIComponent(article.id)}/edit`}>
                수정하기
              </Link>
              <button type="button" onClick={handleDeleteArticle}>
                삭제하기
              </button>
            </div>
          </details>
          <div className={styles.metadataRow}>
            <Image
              className={styles.author}
              src="/images/user-profile.svg"
              alt=""
              width={40}
              height={40}
            />
            <div className={styles.authorDetails}>
              <span className={styles.nickname}>{nickname}</span>
              <time className={styles.date} dateTime={article.createdAt}>
                {formatDate(article.createdAt)}
              </time>
            </div>
            <svg
              className={styles.metadataDivider}
              width="1"
              height="34"
              viewBox="0 0 1 34"
              fill="none"
              aria-hidden="true"
            >
              <path d="M0.5 0V34" stroke="#E5E7EB" />
            </svg>
            <span className={styles.like} aria-label={`좋아요 ${likeCount}개`}>
              <HeartIcon size={32} />
              {likeCount}
            </span>
          </div>
        </header>
        <p className={styles.content}>{article.content}</p>
      </article>

      {error && <p className={styles.error}>{error}</p>}
    </>
  );
}
