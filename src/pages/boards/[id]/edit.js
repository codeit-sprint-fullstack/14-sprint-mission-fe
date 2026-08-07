import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../BoardForm.module.css";

export default function BoardEditPage() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    async function getArticle() {
      try {
        const response = await fetch(`/api/articles/${id}`);
        const article = await response.json();

        if (!response.ok) {
          throw new Error(article.message);
        }

        setTitle(article.title);
        setContent(article.content);
      } catch (error) {
        console.error(error);
        alert(error.message);
        router.push("/boards");
      } finally {
        setIsLoading(false);
      }
    }

    getArticle();
  }, [router.isReady, id, router]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !content.trim() || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`/api/articles/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
        }),
      });

      const article = await response.json();

      if (!response.ok) {
        throw new Error(article.message);
      }

      router.push(`/boards/${article.id}`);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <p>게시글을 불러오는 중입니다.</p>;
  }

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <h1 className={styles.pageTitle}>게시글 수정</h1>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={!title.trim() || !content.trim() || isSubmitting}
          >
            {isSubmitting ? "수정 중" : "수정 완료"}
          </button>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>*제목</label>

          <input
            className={styles.titleInput}
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>*내용</label>

          <textarea
            className={styles.contentInput}
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
      </form>
    </div>
  );
}
