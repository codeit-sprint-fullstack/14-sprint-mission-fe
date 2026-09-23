"use client";

import { getProductImageUrl } from "@/lib/productImageUtils";
import Image from "next/image";
import { useState } from "react";

export default function ProductForm({
  product = null,
  onSubmit,
  isSubmitting = false,
  submitLabel,
}) {
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [tags, setTags] = useState(product?.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [existingImages, setExistingImages] = useState(product?.images ?? []);
  const [newImages, setNewImages] = useState([]);

  const isValid =
    name.trim().length > 0 &&
    description.trim().length > 0 &&
    price.trim().length > 0 &&
    Number.isInteger(Number(price)) &&
    Number(price) >= 0;

  const handleTagKeyDown = (event) => {
    if (event.key !== "Enter") return;

    event.preventDefault();

    const tag = tagInput.trim();

    if (!tag || tags.includes(tag)) return;

    setTags((prevTags) => [...prevTags, tag]);
    setTagInput("");
  };

  const handleRemoveTag = (targetTag) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== targetTag));
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files ?? []);
    const remainingCount = 3 - existingImages.length - newImages.length;

    if (remainingCount <= 0) {
      event.target.value = "";
      return;
    }

    const selectedFiles = files.slice(0, remainingCount);

    const imageItems = selectedFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setNewImages((prevImages) => [...prevImages, ...imageItems]);
    event.target.value = "";
  };

  const handleRemoveExistingImage = (imageUrl) => {
    setExistingImages((prevImages) =>
      prevImages.filter((image) => image !== imageUrl),
    );
  };

  const handleRemoveNewImage = (previewUrl) => {
    const targetImage = newImages.find(
      (image) => image.previewUrl === previewUrl,
    );

    if (targetImage) {
      URL.revokeObjectURL(targetImage.previewUrl);
    }

    setNewImages((prevImages) =>
      prevImages.filter((image) => image.previewUrl !== previewUrl),
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid || isSubmitting) return;

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      tags,
      existingImages,
      newImages: newImages.map((image) => image.file),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        상품 이미지
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </label>

      {(existingImages.length > 0 || newImages.length > 0) && (
        <div>
          {existingImages.map((imageUrl) => (
            <div key={imageUrl}>
              {/* 사용자 등록 이미지 URL은 호스트가 고정되지 않아 img를 사용 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getProductImageUrl(imageUrl)}
                alt="상품 이미지 미리보기"
              />

              <button
                type="button"
                aria-label="이미지 삭제"
                onClick={() => handleRemoveExistingImage(imageUrl)}
              >
                <Image src="/images/ic_X.png" alt="" width={24} height={24} />
              </button>
            </div>
          ))}

          {newImages.map((image) => (
            <div key={image.previewUrl}>
              {/* 로컬에서 선택한 blob URL 미리보기 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.previewUrl} alt="상품 이미지 미리보기" />

              <button
                type="button"
                aria-label="이미지 삭제"
                onClick={() => handleRemoveNewImage(image.previewUrl)}
              >
                <Image src="/images/ic_X.png" alt="" width={24} height={24} />
              </button>
            </div>
          ))}
        </div>
      )}

      <label>
        상품명
        <input value={name} onChange={(event) => setName(event.target.value)} />
      </label>

      <label>
        상품 소개
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>

      <label>
        판매가격
        <input
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </label>

      <label>
        태그
        <input
          value={tagInput}
          onChange={(event) => setTagInput(event.target.value)}
          onKeyDown={handleTagKeyDown}
        />
      </label>

      {tags.length > 0 && (
        <div>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleRemoveTag(tag)}
            >
              <span>#{tag}</span>
              <Image src="/images/ic_X.png" alt="" width={24} height={24} />
            </button>
          ))}
        </div>
      )}

      <button type="submit" disabled={!isValid || isSubmitting}>
        {submitLabel}
      </button>
    </form>
  );
}
