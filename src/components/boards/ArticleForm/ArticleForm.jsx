"use client";

import Button from "@/components/Button/Button";
import styles from "./ArticleForm.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAsyncAction from "@/hooks/useAsyncAction";
import { createArticle, updateArticle } from "@/lib/articleApi";

export default function ArticleForm({
  initialTitle = "",
  initialContent = "",
  articleId,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const router = useRouter();

  const isEditMode = Boolean(articleId);

  const { execute, isLoading, errorMessage } = useAsyncAction(
    isEditMode
      ? "게시글을 수정하지 못했습니다. 잠시 후 다시 시도해 주세요."
      : "게시글을 등록하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  );

  const isFormValid = title.trim() !== "" && content.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid || isLoading) return;

    const result = await execute(() => {
      if (isEditMode) {
        return updateArticle(articleId, title.trim(), content.trim());
      }

      return createArticle(title.trim(), content.trim());
    });

    if (!result.success) return;

    const targetArticleId = isEditMode ? articleId : result.data.id;

    router.push(`/boards/${targetArticleId}`);
  };

  return (
    <form className={styles.page} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h1 className={styles.title}>게시글 쓰기</h1>

        <Button type="submit" disabled={!isFormValid || isLoading}>
          등록
        </Button>
      </div>

      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="title">
            *제목
          </label>

          <input
            id="title"
            className={styles.input}
            type="text"
            placeholder="제목을 입력해 주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="content">
            *내용
          </label>

          <textarea
            id="content"
            className={styles.textarea}
            placeholder="내용을 입력해 주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {errorMessage && (
          <p className={styles.errorMessage} role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}
