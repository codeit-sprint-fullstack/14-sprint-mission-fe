//게시글 입력 폼
import { useState } from "react";

import styles from "./ArticleForm.module.css";

export default function ArticleForm({
  initialTitle = "",
  initialContent = "",
  heading = "게시글 쓰기",
  submitLabel = "등록",
  onSubmit,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const isValid = title.trim() !== "" && content.trim() !== "";

  async function handleSubmit(event) {
    event.preventDefault();

    //유효성검사 (제목이비어있음/내용이비어있음/이미등록중)
    if (!isValid || isSubmitting) {
      return;
    }
    //등록중 상태로 변경하여 여러번 등록하기 막는 용도 
    setIsSubmitting(true);
    setError("");

    try {
      //부모에게 내용 전달 (부모쪽에서 create/update를 선택하여 호출)
      await onSubmit({
        title: title.trim(),
        content: content.trim(),
      });
    } catch (submitError) {
      setError(submitError.message || "요청 처리 중 오류가 발생했습니다.");
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h1 className={styles.heading}>{heading}</h1>
        <button
          className={styles.submitButton}
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "등록 중" : submitLabel}
        </button>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>*제목</span>
        <input
          className={styles.input}
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="제목을 입력해주세요"
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>*내용</span>
        <textarea
          className={styles.textarea}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="내용을 입력해주세요"
        />
      </label>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
