import Image from "next/image";
import Link from "next/link";
import { DEFAULT_PROFILE_IMAGE } from "@/constant/board";
import ArticleActions from "./ArticleActions";
import CommentSection from "./CommentSection";
import styles from "./detail.module.css";
import { notFound } from "next/navigation";
import { getFallbackNickname } from "@/utils/nickname";

async function getArticle(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}`,
    { cache: "no-store" },
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) throw new Error("게시글 조회 실패");
  return res.json();
}

async function getComments(id) {
  const params = new URLSearchParams({ take: "10" });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}/comments?${params.toString()}`,
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error("댓글 조회 실패");
  return res.json();
}

export default async function BoardPage({ params }) {
  const { id } = await params;

  const [article, commentData] = await Promise.all([
    getArticle(id),
    getComments(id),
  ]);

  const comments = commentData.list ?? [];

  return (
    <div className={`wrapper ${styles.page}`}>
      <article className={styles.articleCard}>
        <div className={styles.articleHeader}>
          <h2 className={styles.articleTitle}>{article.title}</h2>
          <ArticleActions articleId={id} />
        </div>

        <div className={styles.articleMeta}>
          <Image
            src={DEFAULT_PROFILE_IMAGE}
            alt=""
            width={32}
            height={32}
            className={styles.profileImage}
          />
          <span className={styles.author}>
            {article.writer?.nickname ?? getFallbackNickname(article.id)}
          </span>
          <span className={styles.date}>
            {new Date(article.createdAt).toLocaleDateString("ko-KR")}
          </span>
          <div className={styles.divider} />
          <div className={styles.likeCount}>
            <Image
              src="/images/icons/ic_empty_heart.svg"
              alt=""
              width={16}
              height={16}
            />
            {article.likeCount ?? 0}
          </div>
        </div>

        {article.image && (
          <div className={styles.articleImageWrapper}>
            <Image
              src={article.image}
              alt=""
              fill
              unoptimized
              className={styles.articleImage}
            />
          </div>
        )}

        <p className={styles.articleContent}>{article.content}</p>
      </article>

      <CommentSection articleId={id} initialComments={comments} />

      <div className={styles.bottomNav}>
        <Link href="/boards" className={styles.backButton}>
          목록으로 돌아가기
          <Image
            src="/images/board/ic_back.svg"
            alt=""
            width={24}
            height={24}
          />
        </Link>
      </div>
    </div>
  );
}
