"use client";

import { useState } from "react";
import styles from "./CommentForm.module.css";
import Button from "@/components/Button/Button";
import { createArticleComment } from "@/lib/commentApi";
import { useRouter } from "next/navigation";
import useAsyncAction from "@/hooks/useAsyncAction";

export default function CommentForm({ articleId }) {
  const [content, setContent] = useState("");
  const router = useRouter();
  const { execute, isLoading, errorMessage } = useAsyncAction(
    "댓글을 등록하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  );

  const isEmpty = content.trim() === "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEmpty || isLoading) return;

    const result = await execute(() =>
      createArticleComment(articleId, content.trim()),
    );

    if (!result.success) return;

    setContent("");
    router.refresh();
  };

  return (
    <form className={styles.commentForm} onSubmit={handleSubmit}>
      <h2 className={styles.title}>댓글 달기</h2>

      <textarea
        className={styles.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력해 주세요."
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
