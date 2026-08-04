import styles from "./page.module.css";

export default async function ArticleDetail({ params }) {
  const { id } = await params;
  const res = await fetch(
    `https://one4-sprint-mission-prisma.onrender.com/articles/${id}`,
    { cache: "no-store" },
  );

  const article = await res.json();

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
        <h2>댓글달기</h2>
        <form></form>
      </section>
    </article>
  );
}
