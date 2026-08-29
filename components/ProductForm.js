"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  createProduct,
  updateProduct,
  uploadImage,
} from "@/services/ProductService";
import styles from "@/app/items/add/add.module.css";

export default function ProductForm({
  mode = "create", // "create" | "edit"
  productId,
  initialName = "",
  initialDescription = "",
  initialPrice = "",
  initialTags = [],
  initialImages = [],
}) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [price, setPrice] = useState(String(initialPrice ?? ""));
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(initialTags);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialImages?.[0] ?? null);
  const [existingImageUrl, setExistingImageUrl] = useState(
    initialImages?.[0] ?? null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [errors, setErrors] = useState({
    image: "",
    name: "",
    description: "",
    price: "",
    tags: "",
  });

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));

    setErrors((prev) => ({ ...prev, image: "" }));
  }

  function handleRemoveImage() {
    setImageFile(null);
    setImagePreview(null);
    setExistingImageUrl(null);
  }

  function handleTagKeyDown(e) {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const value = tagInput.trim();
    if (!value) return;

    if (value.length > 5) {
      setErrors((prev) => ({ ...prev, tags: "5글자 이내로 입력해주세요." }));
      return;
    }

    if (tags.includes(value)) {
      setTagInput("");
      return;
    }

    setTags((prev) => [...prev, value]);
    setTagInput("");
    setErrors((prev) => ({ ...prev, tags: "" }));
  }

  function handleRemoveTag(tag) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  async function handleSubmit() {
    const newErrors = {
      image: !imageFile && !existingImageUrl ? "이미지를 등록해주세요." : "",

      name:
        name.trim() === ""
          ? "상품명을 입력해주세요."
          : name.trim().length > 10
            ? "10자 이내로 입력해주세요."
            : "",

      description:
        description.trim() === ""
          ? "상품 소개를 입력해주세요."
          : description.trim().length < 10
            ? "10자 이상 입력해주세요."
            : "",

      price:
        price.trim() === ""
          ? "판매 가격을 입력해주세요."
          : !/^\d+$/.test(price)
            ? "숫자로 입력해주세요."
            : "",

      tags: tagInput.trim().length > 5 ? "5글자 이내로 입력해주세요." : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      let imageUrls = existingImageUrl ? [existingImageUrl] : [];

      if (imageFile) {
        const { url } = await uploadImage(imageFile);
        imageUrls = [url];
      }

      const payload = {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        tags,
        images: imageUrls,
      };

      if (isEdit) {
        await updateProduct(productId, payload);
        router.push(`/items/${productId}`);
      } else {
        const newProduct = await createProduct(payload);
        router.push(`/items/${newProduct.id}`);
      }
    } catch (err) {
      console.error(err);
      setError(
        isEdit
          ? "상품 수정에 실패했습니다. 다시 시도해주세요."
          : "상품 등록에 실패했습니다. 다시 시도해주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={`wrapper ${styles.page}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isEdit ? "상품 수정하기" : "상품 등록하기"}
          </h2>

          <button
            type="button"
            className={styles.submitButton}
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting
              ? isEdit
                ? "수정 중..."
                : "등록 중..."
              : isEdit
                ? "수정"
                : "등록"}
          </button>
        </div>

        {error && <p className={styles.errorText}>{error}</p>}

        <div className={styles.field}>
          <label>이미지</label>

          <div
            className={`${styles.imageWrapper} ${
              errors.image ? styles.imageError : ""
            }`}
          >
            <label htmlFor="image" className={styles.imageButton}>
              <div className={styles.imageUploadIconWrapper}>
                <Image src="/images/icons/ic_plus.svg" alt="" width={48} height={48} />
                <span>이미지 등록</span>
              </div>
            </label>

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

          <p className={styles.fieldError}>
            *이미지 등록은 최대 1개까지 가능합니다.
          </p>
        </div>

        <div className={styles.field}>
          <label htmlFor="name">상품명</label>
          <input
            id="name"
            type="text"
            placeholder="상품명을 입력해 주세요"
            value={name}
            className={errors.name ? styles.inputError : ""}
            onChange={(e) => {
              const value = e.target.value;
              setName(value);
              setErrors((prev) => ({
                ...prev,
                name:
                  value.trim() === ""
                    ? ""
                    : value.trim().length > 10
                      ? "10자 이내로 입력해주세요."
                      : "",
              }));
            }}
          />
          {errors.name && <p className={styles.fieldError}>{errors.name}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="description">상품 소개</label>
          <textarea
            id="description"
            placeholder="상품 소개를 입력해 주세요"
            value={description}
            className={errors.description ? styles.inputError : ""}
            onChange={(e) => {
              const value = e.target.value;
              setDescription(value);
              setErrors((prev) => ({
                ...prev,
                description:
                  value.trim() === ""
                    ? ""
                    : value.trim().length < 10
                      ? "10자 이상 입력해주세요."
                      : "",
              }));
            }}
          />
          {errors.description && (
            <p className={styles.fieldError}>{errors.description}</p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="price">판매가격</label>
          <input
            id="price"
            type="text"
            placeholder="판매 가격을 입력해 주세요"
            value={price}
            className={errors.price ? styles.inputError : ""}
            onChange={(e) => {
              const value = e.target.value;
              setPrice(value);
              setErrors((prev) => ({
                ...prev,
                price:
                  value.trim() === ""
                    ? ""
                    : /^\d+$/.test(value.trim())
                      ? ""
                      : "숫자로 입력해주세요.",
              }));
            }}
          />
          {errors.price && <p className={styles.fieldError}>{errors.price}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="tags">태그</label>
          <input
            id="tags"
            type="text"
            placeholder="태그를 입력 후 Enter를 눌러주세요"
            value={tagInput}
            className={errors.tags ? styles.inputError : ""}
            onChange={(e) => {
              const value = e.target.value;
              setTagInput(value);
              setErrors((prev) => ({
                ...prev,
                tags: value.trim().length > 5 ? "5글자 이내로 입력해주세요." : "",
              }));
            }}
            onKeyDown={handleTagKeyDown}
          />
          {errors.tags && <p className={styles.fieldError}>{errors.tags}</p>}

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
      </div>
    </main>
  );
}