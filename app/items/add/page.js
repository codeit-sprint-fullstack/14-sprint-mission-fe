"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createProduct, uploadImage } from "@/services/ProductService";
import styles from "./add.module.css";

export default function RegistrationPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const isValid = name.trim() && description.trim() && price !== "";

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function handleRemoveImage() {
    setImageFile(null);
    setImagePreview(null);
  }

  function handleTagKeyDown(e) {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const value = tagInput.trim();
    if (!value) return;
    if (tags.includes(value)) {
      setTagInput("");
      return;
    }

    setTags((prev) => [...prev, value]);
    setTagInput("");
  }

  function handleRemoveTag(tag) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  async function handleSubmit() {
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      let imageUrls = [];

      if (imageFile) {
        const { url } = await uploadImage(imageFile);
        imageUrls = [url];
      }

      await createProduct({
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        tags,
        images: imageUrls,
      });

      router.push("/items");
    } catch (err) {
      console.error(err);
      setError("상품 등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={`wrapper ${styles.page}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>상품 등록하기</h2>
          <button
            type="button"
            className={styles.submitButton}
            disabled={!isValid || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "등록 중..." : "등록"}
          </button>
        </div>

        {error && <p className={styles.errorText}>{error}</p>}

        <div className={styles.field}>
          <label htmlFor="name">*상품명</label>
          <input
            id="name"
            type="text"
            placeholder="상품명을 입력해 주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="description">*상품 소개</label>
          <textarea
            id="description"
            placeholder="상품 소개를 입력해 주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="price">*판매가격</label>
          <input
            id="price"
            type="number"
            min="0"
            placeholder="판매 가격을 입력해 주세요"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="tags">태그</label>
          <input
            id="tags"
            type="text"
            placeholder="태그를 입력 후 Enter를 눌러주세요"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
          />
          {tags.length > 0 && (
            <div className={styles.tagList}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    aria-label={`${tag} 태그 삭제`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className={styles.field}>
          <label>이미지</label>
          <div className={styles.imageWrapper}>
            {!imagePreview && (
              <label htmlFor="image" className={styles.imageButton}>
                <div className={styles.imageUploadIconWrapper}>
                  <Image
                    src="/images/icons/ic_plus.svg"
                    alt=""
                    width={48}
                    height={48}
                  />
                  <span>이미지 등록</span>
                </div>
              </label>
            )}
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.hiddenFileInput}
            />

            {imagePreview && (
              <div className={styles.imagePreviewBox}>
                <Image
                  src={imagePreview}
                  alt="업로드한 이미지 미리보기"
                  fill
                  className={styles.imagePreview}
                />
                <button
                  type="button"
                  className={styles.removeImageButton}
                  onClick={handleRemoveImage}
                  aria-label="이미지 삭제"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}