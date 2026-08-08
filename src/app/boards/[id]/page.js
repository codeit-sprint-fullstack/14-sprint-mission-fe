import Image from "next/image";
import styles from "./page.module.css";
import { getArticle } from "@/lib/articleApi";
import { getArticleComments } from "@/lib/commentApi";
import { formatDate } from "@/lib/dateUtils";
import CommentForm from "@/components/boards/CommentForm/CommentForm";
import CommentItem from "@/components/boards/CommentItem/CommentItem";
import Button from "@/components/Button/Button";
import ArticleActionMenu from "@/components/boards/ArticleActionMenu/ArticleActionMenu";
import { notFound } from "next/navigation";

export default async function BoardDetailPage({ params }) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  const { list: comments } = await getArticleComments(id);

  return (
    <div className={styles.page}>
      <section className={styles.article}>
        <div className={styles.articleHeader}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{article.title}</h1>

            <ArticleActionMenu articleId={id} />
          </div>

          <div className={styles.meta}>
            <Image
              src="/images/ic_profile.svg"
              alt=""
              width={40}
              height={40}
              className={styles.profileImage}
            />

            <span className={styles.nickname}>잘하고 싶다</span>
            <time className={styles.date}>{formatDate(article.createdAt)}</time>

            <div className={styles.divider} />

            <button type="button" className={styles.likes} aria-label="좋아요">
              <Image src="/images/ic_heart.svg" alt="" width={24} height={24} />
              <span>7777</span>
            </button>
          </div>
        </div>

        <p className={styles.content}>{article.content}</p>
      </section>

      <CommentForm articleId={id} />

      {comments.length > 0 ? (
        <div className={styles.commentList}>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyComments}>
          <Image
            src="/images/img_reply_empty.png"
            alt=""
            width={140}
            height={140}
          />

          <p className={styles.emptyText}>
            아직 댓글이 없어요,
            <br />
            지금 댓글을 달아보세요!
          </p>
        </div>
      )}

      <div className={styles.backButton}>
        <Button href="/boards" className={styles.backButtonContent}>
          목록으로 돌아가기
          <Image src="/images/ic_back.svg" alt="" width={24} height={24} />
        </Button>
      </div>
    </div>
  );
}
