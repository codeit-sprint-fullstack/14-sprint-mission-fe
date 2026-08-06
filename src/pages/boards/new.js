import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./BoardForm.module.css";

export default function BoardCreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch("/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    const article = await response.json();

    if (!response.ok) {
      alert(article.message);
      return;
    }

    router.push(`/boards/${article.id}`);
  }

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <h1 className={styles.pageTitle}>게시글 쓰기</h1>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={!title.trim() || !content.trim()}
          >
            등록
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
