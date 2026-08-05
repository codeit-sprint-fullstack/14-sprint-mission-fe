import { deleteArticle } from "@/app/actions/articleActions";
import { createComment, deleteComment } from "@/app/actions/commentActions";
import styles from "./page.module.css";
import Link from "next/link";

function ActionMenu({ editContent, deleteAction }) {
  return (
    <div className={styles.actionMenu}>
      <Link href={editContent}>수정하기</Link>
      <form action={deleteAction}>
        <button type="submit">삭제하기</button>
      </form>
    </div>
  );
}

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
  const deleteArticleWithId = deleteArticle.bind(null, id);

  return (
    <article>
      <div className={styles.articleInfo}>
        <div className={styles.articleHeader}>
          <h1 className={styles.title}>{article.title}</h1>
          <div className={styles.authorInfo}>
            <span>총명한 판다</span>
            <span>2026. 08. 04</span>
          </div>
          <span className={styles.divider} />

          <div className={styles.like}>하트 123</div>
        </div>
        <ActionMenu
          editContent={`/articles/${id}/edit`}
          deleteAction={deleteArticleWithId}
        />
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
      </section>

      <div className={styles.commentList}>
        {comments.length === 0 ? (
          <p className={styles.emptyComment}>
            아직 댓글이 없어요, 지금 댓글을 달아보세요!
          </p>
        ) : (
          comments.map((comment) => {
            const deleteCommentWithId = deleteComment.bind(
              null,
              id,
              comment.id,
            );

            return (
              <div className={styles.commentItem} key={comment.id}>
                <div className={styles.commentBody}>
                  <p>{comment.content}</p>
                  <div className={styles.commentAuthor}>
                    <div>똑똑한판다</div>
                  </div>
                </div>

                <ActionMenu
                  editContent={`/articles/${id}/comments/${comment.id}/edit`}
                  deleteAction={deleteCommentWithId}
                />
              </div>
            );
          })
        )}
      </div>

      <div className={styles.goBackButton}>목록으로 돌아가기</div>
    </article>
  );
}
