"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "../../add/AddArticle.module.css";

export default function EditBoard() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const isValid = title.trim() !== "" && content.trim() !== "";

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}`,
        );
        if (!res.ok) throw new Error("게시글 조회 실패");
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
        if (data.image) {
          setImage(data.image);
          setImagePreview(data.image);
        }
      } catch (err) {
        alert("게시글 정보를 불러오지 못했어요.");
        router.push("/boards");
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [id, router]);

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

  async function handleSubmit() {
    if (!isValid || submitting || uploading) return;

    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            content,
            image: image ?? undefined,
          }),
        },
      );
      if (!res.ok) throw new Error("게시글 수정 실패");
      router.push(`/boards/${id}`);
    } catch (err) {
      alert("게시글 수정에 실패했어요. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="wrapper">
        <div className={styles.articleContainer}>불러오는 중...</div>
      </main>
    );
  }

  return (
    <main className="wrapper">
      <div className={styles.articleContainer}>
        <div className={styles.articleHeader}>
          <h2 className={styles.articleTitle}>게시글 수정</h2>
          <button
            type="button"
            className={styles.articleSubmitButton}
            disabled={!isValid || submitting || uploading}
            onClick={handleSubmit}
          >
            {submitting ? "수정 중..." : "수정"}
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
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
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