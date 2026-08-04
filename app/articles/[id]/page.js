import { createComment } from "@/app/actions/commentActions";
import styles from "./page.module.css";

export default async function ArticleDetail({ params }) {
  const { id } = await params;

  const [articleRes, commentsRes] = await Promise.all([
    fetch(`https://one4-sprint-mission-prisma.onrender.com/articles/${id}`, {
      cache: "no-store",
    }),
    fetch(
      `https://one4-sprint-mission-prisma.onrender.com/articles/${id}/comments`,
      {
        cache: "no-store",
      },
    ),
  ]);

  if (!articleRes.ok) {
    throw new Error("게시글을 불러오는데 실패했습니다");
  }

  if (!commentsRes.ok) {
    throw new Error("댓글을 불러오는데 실패했습니다");
  }

  const article = await articleRes.json();
  const comments = await commentsRes.json();
  const createCommentWithArticleId = createComment.bind(null, id);

  return (
    <article>
      <div className={styles.articleHeader}>
        <h1 className={styles.title}>{article.title}</h1>
        <div className={styles.authorInfo}>
          <span>총명한 판다</span>
          <span>2026. 08. 04</span>
        </div>
        <span className={styles.divider} />

        <div className={styles.like}>하트 123</div>
      </div>

      <p className={styles.articleContent}>{article.content}</p>

      <section className={styles.commentSection}>
        <h2 className={styles.commentTitle}>댓글달기</h2>
        <form action={createCommentWithArticleId}>
          <textarea
            className={styles.commentTextArea}
            name="content"
            placeholder="댓글을 입력해주세요"
            required
          />
          <button className={styles.commentSubmitButton} type="submit">
            등록
          </button>
        </form>

        <div className={styles.commentList}>
          {comments.length === 0 ? (
            <p className={styles.emptyComment}>
              아직 댓글이 없어요, 지금 댓글을 달아보세요!
            </p>
          ) : (
            comments.map((comment) => (
              <div className={styles.commentIdBox}>
                <div key={comment.id}>
                  <p>{comment.content}</p>
                  <div>똑똑한판다</div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      <div className={styles.goBackButton}>목록으로 돌아가기</div>
    </article>
  );
}
