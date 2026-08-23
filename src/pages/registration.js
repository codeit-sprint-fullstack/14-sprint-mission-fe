import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

import Footer from "@/components/Footer";
import useProductFormValidation from "@/hooks/useProductFormValidation";
import pandaMarketApi from "@/lib/api";

import styles from "@/styles/Registration.module.css";

export default function Registration() {
  const router = useRouter();

  // 상품 등록 요청
  const createProductMutation = useMutation({
    mutationFn: async (productData) => {
      const accessToken = localStorage.getItem("accessToken");

      const response = await pandaMarketApi.post(
        "/products",
        productData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return response.data;
    },
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const {
    errors,
    isFormValid,
    touchField,
    touchAllFields,
  } = useProductFormValidation({
    name,
    description,
    price,
    tagInput,
    tags,
  });

  // 태그 추가
  function handleTagKeyDown(event) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    touchField("tag");

    const newTag = tagInput.trim();

    if (!newTag) {
      return;
    }

    if (newTag.length > 5) {
      return;
    }

    if (tags.includes(newTag)) {
      setTagInput("");
      return;
    }

    setTags([...tags, newTag]);
    setTagInput("");
  }

  // 태그 삭제
  function handleTagDelete(tagToDelete) {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag !== tagToDelete);
    });
  }

  // 상품 등록
  async function handleSubmit(event) {
    event.preventDefault();

    if (!isFormValid) {
      touchAllFields();
      return;
    }

    try {
      const productData = {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        tags,
        images: [],
      };

      const createdProduct =
        await createProductMutation.mutateAsync(productData);

      router.push(`/items/${createdProduct.id}`);
    } catch (error) {
      console.error(error);
      alert("상품 등록에 실패했습니다.");
    }
  }

  return (
    <>
      <main className={styles.registrationPage}>
        <form
          className={styles.registrationForm}
          onSubmit={handleSubmit}
        >
          <div className={styles.registrationFormHeader}>
            <h1 className={styles.registrationTitle}>
              상품 등록하기
            </h1>

            <button
              type="submit"
              className={styles.registrationSubmitButton}
              disabled={!isFormValid}
            >
              등록
            </button>
          </div>

          <div className={styles.registrationField}>
            <label
              htmlFor="product-name"
              className={styles.registrationLabel}
            >
              상품명
            </label>

            <input
              id="product-name"
              type="text"
              className={`${styles.registrationInput} ${errors.name ? styles.registrationInputError : ""
                }`}
              placeholder="상품명을 입력해주세요"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              onBlur={() => {
                touchField("name");
              }}
            />

            {errors.name && (
              <p className={styles.registrationErrorMessage}>
                {errors.name}
              </p>
            )}
          </div>

          <div className={styles.registrationField}>
            <label
              htmlFor="product-description"
              className={styles.registrationLabel}
            >
              상품 소개
            </label>

            <textarea
              id="product-description"
              className={`${styles.registrationTextarea} ${errors.description
                ? styles.registrationInputError
                : ""
                }`}
              placeholder="상품 소개를 입력해주세요"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              onBlur={() => {
                touchField("description");
              }}
            />

            {errors.description && (
              <p className={styles.registrationErrorMessage}>
                {errors.description}
              </p>
            )}
          </div>

          <div className={styles.registrationField}>
            <label
              htmlFor="product-price"
              className={styles.registrationLabel}
            >
              판매가격
            </label>

            <input
              id="product-price"
              type="text"
              className={`${styles.registrationInput} ${errors.price ? styles.registrationInputError : ""
                }`}
              placeholder="판매 가격을 입력해주세요"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              onBlur={() => {
                touchField("price");
              }}
            />

            {errors.price && (
              <p className={styles.registrationErrorMessage}>
                {errors.price}
              </p>
            )}
          </div>

          <div className={styles.registrationField}>
            <label
              htmlFor="product-tag"
              className={styles.registrationLabel}
            >
              태그
            </label>

            <input
              id="product-tag"
              type="text"
              className={`${styles.registrationInput} ${errors.tag ? styles.registrationInputError : ""
                }`}
              placeholder="태그를 입력해주세요"
              value={tagInput}
              onChange={(event) => {
                setTagInput(event.target.value);
              }}
              onKeyDown={handleTagKeyDown}
              onBlur={() => {
                touchField("tag");
              }}
            />

            {errors.tag && (
              <p className={styles.registrationErrorMessage}>
                {errors.tag}
              </p>
            )}

            <div className={styles.registrationTagList}>
              {tags.map((tag) => {
                return (
                  <span
                    key={tag}
                    className={styles.registrationTag}
                  >
                    #{tag}

                    <button
                      type="button"
                      onClick={() => {
                        handleTagDelete(tag);
                      }}
                      className={styles.registrationTagDeleteButton}
                      aria-label={`${tag} 태그 삭제`}
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </>
  );
}