import ArticleActionMenu from "@/components/boards/ArticleActionMenu/ArticleActionMenu";
import ArticleCommentForm from "@/components/boards/ArticleCommentForm/ArticleCommentForm";
import ArticleCommentList from "@/components/boards/ArticleCommentList/ArticleCommentList";
import Button from "@/components/Button/Button";
import { getArticle } from "@/lib/articleApi";
import { getArticleComments } from "@/lib/commentApi";
import { formatDate } from "@/lib/dateUtils";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

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

            <ArticleActionMenu articleId={id} ownerId={article.owner.id} />
          </div>

          <div className={styles.meta}>
            <Image
              src="/images/ic_profile.svg"
              alt=""
              width={40}
              height={40}
              className={styles.profileImage}
            />

            <span className={styles.nickname}>{article.owner.nickname}</span>
            <time className={styles.date}>{formatDate(article.createdAt)}</time>

            <div className={styles.divider} />

            <button type="button" className={styles.likes} aria-label="좋아요">
              <Image src="/images/ic_heart.svg" alt="" width={24} height={24} />
              <span>{article.likeCount}</span>
            </button>
          </div>
        </div>

        <p className={styles.content}>{article.content}</p>
      </section>

      <ArticleCommentForm articleId={id} />

      {comments.length > 0 ? (
        <div className={styles.commentList}>
          <ArticleCommentList comments={comments} />
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
