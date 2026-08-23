import { useEffect, useState } from "react";

import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "@/styles/ArticleForm.module.css";

export default function EditArticlePage() {
  const router = useRouter();
  const { articleId } = router.query;

  // 제목 입력값 저장
  const [title, setTitle] = useState("");

  // 내용 입력값 저장
  const [content, setContent] = useState("");

  // 기존 게시글 요청 상태 저장
  const [isLoading, setIsLoading] = useState(true);

  // 게시글 수정 진행 상태 저장
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 게시글 요청 오류 메시지 저장
  const [errorMessage, setErrorMessage] = useState("");

  // 제목과 내용을 모두 입력했는지 확인
  const isFormValid = Boolean(title.trim() && content.trim());

  // 주소의 게시글 ID가 준비되면 기존 정보 요청
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const fetchArticle = async () => {
      try {
        setErrorMessage("");

        // 수정할 게시글의 기존 정보 요청
        const response = await axios.get(`/api/articles/${articleId}`);

        // 기존 제목과 내용을 입력란에 표시
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);

        setErrorMessage(
          error.response?.data?.message ??
            "게시글을 불러오지 못했습니다.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articleId, router.isReady]);

  // 게시글 수정 요청 처리
  const handleSubmit = async (event) => {
    event.preventDefault();

    // 입력값이 없거나 수정 중이면 요청 차단
    if (!isFormValid || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      // 수정한 제목과 내용을 게시글 수정 API에 전달
      await axios.patch(`/api/articles/${articleId}`, {
        title,
        content,
      });

      // 수정된 게시글의 상세 페이지로 이동
      router.push(`/articles/${articleId}`);
    } catch (error) {
      console.error("게시글 수정 실패:", error);

      setErrorMessage(
        error.response?.data?.message ??
          "게시글을 수정하지 못했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p>게시글을 불러오는 중입니다.</p>;
  }

  return (
    <>
      <Head>
        <title>게시글 수정 | 판다마켓</title>
      </Head>

      <main className={styles.page}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* 페이지 제목과 수정 버튼 영역 */}
          <div className={styles.formHeader}>
            <h1 className={styles.title}>게시글 수정</h1>

            <button
              className={styles.submitButton}
              type="submit"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "수정 중..." : "수정"}
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
