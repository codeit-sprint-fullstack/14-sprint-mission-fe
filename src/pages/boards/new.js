import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./BoardForm.module.css";

export default function BoardCreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !content.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("게시글 등록에 실패했습니다.");
      }

      const article = await response.json();
      router.push(`/boards/${article.id}`);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <h1 className={styles.pageTitle}>게시글 쓰기</h1>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={!title.trim() || !content.trim() || isSubmitting}
          >
            {isSubmitting ? "등록 중..." : "등록"}
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
