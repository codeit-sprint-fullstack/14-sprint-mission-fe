"use client";

import Button from "@/components/Button/Button";
import { useState } from "react";
import styles from "./CommentForm.module.css";

export default function CommentForm({
  title,
  placeholder,
  onSubmit,
  isLoading = false,
  errorMessage = "",
}) {
  const [content, setContent] = useState("");

  const isEmpty = content.trim() === "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEmpty || isLoading) return;

    const isSuccess = await onSubmit(content.trim());

    if (!isSuccess) return;

    setContent("");
  };

  return (
    <form className={styles.commentForm} onSubmit={handleSubmit}>
      <h2 className={styles.title}>{title}</h2>

      <textarea
        className={styles.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
      />

      {errorMessage && (
        <p className={styles.errorMessage} role="alert">
          {errorMessage}
        </p>
      )}

      <div className={styles.buttonRow}>
        <Button type="submit" disabled={isEmpty || isLoading}>
          등록
        </Button>
      </div>
    </form>
  );
}
