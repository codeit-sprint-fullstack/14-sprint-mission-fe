import { useState } from "react";

import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "@/styles/ArticleForm.module.css";

export default function NewArticlePage() {
  const router = useRouter();

  // 제목 입력값 저장
  const [title, setTitle] = useState("");

  // 내용 입력값 저장
  const [content, setContent] = useState("");

  // 게시글 등록 진행 상태 저장
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 게시글 등록 오류 메시지 저장
  const [errorMessage, setErrorMessage] = useState("");

  // 제목과 내용을 모두 입력했는지 확인
  const isFormValid = Boolean(title.trim() && content.trim());

  // 게시글 등록 요청 처리
  const handleSubmit = async (event) => {
    event.preventDefault();

    // 입력값이 없거나 등록 중이면 요청 차단
    if (!isFormValid || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      // 입력한 제목과 내용을 게시글 등록 API에 전달
      const response = await axios.post("/api/articles", {
        title,
        content,
      });

      // 생성된 게시글의 상세 페이지로 이동
      router.push(`/articles/${response.data.id}`);
    } catch (error) {
      console.error("게시글 등록 실패:", error);

      setErrorMessage(
        error.response?.data?.message ??
          "게시글을 등록하지 못했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>게시글 등록 | 판다마켓</title>
      </Head>

      <main className={styles.page}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* 페이지 제목과 등록 버튼 영역 */}
          <div className={styles.formHeader}>
            <h1 className={styles.title}>게시글 쓰기</h1>

            <button
              className={styles.submitButton}
              type="submit"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "등록 중..." : "등록"}
            </button>
          </div>

          {/* 게시글 제목 입력 영역 */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="article-title">
              <span className={styles.required}>*</span>제목
            </label>

            <input
              className={styles.input}
              id="article-title"
              name="title"
              type="text"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          {/* 게시글 내용 입력 영역 */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="article-content">
              <span className={styles.required}>*</span>내용
            </label>

            <textarea
              className={styles.textarea}
              id="article-content"
              name="content"
              placeholder="내용을 입력해주세요"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>

          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </form>
      </main>
    </>
  );
}