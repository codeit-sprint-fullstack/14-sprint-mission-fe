"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/boards/add/AddArticle.module.css";

export default function ArticleForm({
  mode = "create", // "create" | "edit"
  articleId,
  initialTitle = "",
  initialContent = "",
  initialImage = null,
}) {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [image, setImage] = useState(initialImage);
  const [imagePreview, setImagePreview] = useState(initialImage);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const isValid = title.trim() !== "" && content.trim() !== "";
  const isEdit = mode === "edit";

  function handleImageClick() {
    fileInputRef.current?.click();
  }

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/images/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      if (!res.ok) throw new Error("이미지 업로드 실패");
      const data = await res.json();
      setImage(data.url);
    } catch (err) {
      alert("이미지 업로드에 실패했어요. 다시 시도해주세요.");
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  }

  function handleImageRemove() {
    setImage(null);
    setImagePreview(null);
  }

  async function handleSubmit() {
    if (!isValid || submitting || uploading) return;

    const url = isEdit
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${articleId}`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles`;
    const method = isEdit ? "PATCH" : "POST";

    setSubmitting(true);
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          image: image ?? undefined,
        }),
      });
      if (!res.ok) throw new Error(isEdit ? "게시글 수정 실패" : "게시글 등록 실패");

      if (isEdit) {
        router.push(`/boards/${articleId}`);
      } else {
        const newArticle = await res.json();
        router.push(`/boards/${newArticle.id}`);
      }
    } catch (err) {
      alert(
        isEdit
          ? "게시글 수정에 실패했어요. 다시 시도해주세요."
          : "게시글 등록에 실패했어요. 다시 시도해주세요.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="wrapper">
      <div className={styles.articleContainer}>
        <div className={styles.articleHeader}>
          <h2 className={styles.articleTitle}>
            {isEdit ? "게시글 수정" : "게시글 쓰기"}
          </h2>
          <button
            type="button"
            className={styles.articleSubmitButton}
            disabled={!isValid || submitting || uploading}
            onClick={handleSubmit}
          >
            {submitting
              ? isEdit
                ? "수정 중..."
                : "등록 중..."
              : isEdit
                ? "수정"
                : "등록"}
          </button>
        </div>

        <div className={styles.articleInput}>
          <label htmlFor="title">*제목</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="제목을 입력해 주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.articleInput}>
          <label htmlFor="content">*내용</label>
          <textarea
            id="content"
            name="content"
            placeholder="내용을 입력해 주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className={styles.articleInput}>
          <label htmlFor="img">이미지</label>
          <div className={styles.articleImgWrapper}>
            <input
              ref={fileInputRef}
              id="img"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />

            {imagePreview ? (
              <div className={styles.imagePreviewWrapper}>
                <img
                  src={imagePreview}
                  alt="업로드한 이미지 미리보기"
                  className={styles.imagePreview}
                />
                <button
                  type="button"
                  className={styles.imageRemoveButton}
                  onClick={handleImageRemove}
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                type="button"
                className={styles.articleImgButton}
                onClick={handleImageClick}
                disabled={uploading}
              >
                <div className={styles.imageUploadIconWrapper}>
                  <img
                    src="/images/icons/ic_plus.svg"
                    alt=""
                    className={styles.imageUploadIcon}
                  />
                  <span>{uploading ? "업로드 중..." : "이미지 등록"}</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}