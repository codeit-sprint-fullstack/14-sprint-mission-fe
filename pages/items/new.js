import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import ConfirmModal from "@/components/items/ConfirmModal";
import useHasAccessToken from "@/hooks/useHasAccessToken";
import useProductFormValidation from "@/hooks/useProductFormValidation";
import { createProduct, uploadProductImage } from "@/lib/api/products";
import { queryKeys } from "@/lib/queryKeys";
import styles from "@/styles/ItemRegistrationPage.module.css";

export default function ItemRegistrationPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const hasToken = useHasAccessToken();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const objectUrlRef = useRef("");
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState({ image: false, name: false, description: false, price: false, tag: false });

  const { errors, isValid } = useProductFormValidation({
    name,
    description,
    price,
    tags,
    tagInput,
    image,
  });

  useEffect(() => {
    if (!router.isReady) return;
    if (!hasToken) {
      router.replace(`/signin?redirect=${encodeURIComponent(router.asPath)}`);
    }
  }, [hasToken, router]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const createMutation = useMutation({
    mutationFn: async () => {
      const imageUrl = await uploadProductImage(image);
      return createProduct({
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        tags,
        images: [imageUrl],
      });
    },
    onSuccess: async (product) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      router.replace(`/items/${product.id}`);
    },
    onError: (error) => {
      setErrorMessage(error.response?.data?.message || "상품 등록에 실패했습니다.");
    },
  });

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    setTouched((previous) => ({ ...previous, image: true }));
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("이미지 파일만 업로드할 수 있습니다.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("이미지는 5MB 이하만 업로드할 수 있습니다.");
      event.target.value = "";
      return;
    }

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const nextPreviewUrl = URL.createObjectURL(file);
    objectUrlRef.current = nextPreviewUrl;
    setImage(file);
    setPreviewUrl(nextPreviewUrl);
  }

  function handleAddTag(event) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    const newTag = tagInput.trim();
    setTouched((previous) => ({ ...previous, tag: true }));
    if (!newTag || newTag.length > 20 || tags.includes(newTag)) return;
    setTags((previous) => [...previous, newTag]);
    setTagInput("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTouched({ image: true, name: true, description: true, price: true, tag: true });
    if (!isValid || createMutation.isPending) return;
    createMutation.mutate();
  }

  if (!hasToken) {
    return <main className={styles.state}>로그인 상태를 확인하는 중입니다...</main>;
  }

  return (
    <>
      <Head><title>상품 등록 | 판다마켓</title></Head>
      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.header}>
            <h1>상품 등록하기</h1>
            <button type="submit" disabled={!isValid || createMutation.isPending}>
              {createMutation.isPending ? "등록 중..." : "등록"}
            </button>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>상품 이미지</span>
            <label className={`${styles.imageInput} ${touched.image && errors.image ? styles.errorInput : ""}`}>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {previewUrl ? (
                // 로컬 미리보기 blob URL을 사용한다.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt="상품 이미지 미리보기" />
              ) : (
                <span><b>＋</b>이미지 등록</span>
              )}
            </label>
            {touched.image && errors.image && <p className={styles.errorMessage}>{errors.image}</p>}
          </div>

          <label className={styles.field}>
            <span className={styles.label}>상품명</span>
            <input className={`${styles.input} ${touched.name && errors.name ? styles.errorInput : ""}`} value={name} onChange={(event) => setName(event.target.value)} onBlur={() => setTouched((previous) => ({ ...previous, name: true }))} placeholder="상품명을 입력해 주세요" />
            {touched.name && errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
          </label>

          <label className={styles.field}>
            <span className={styles.label}>상품 소개</span>
            <textarea className={`${styles.textarea} ${touched.description && errors.description ? styles.errorInput : ""}`} value={description} onChange={(event) => setDescription(event.target.value)} onBlur={() => setTouched((previous) => ({ ...previous, description: true }))} placeholder="상품 소개를 입력해 주세요" />
            {touched.description && errors.description && <p className={styles.errorMessage}>{errors.description}</p>}
          </label>

          <label className={styles.field}>
            <span className={styles.label}>판매가격</span>
            <input className={`${styles.input} ${touched.price && errors.price ? styles.errorInput : ""}`} value={price} onChange={(event) => setPrice(event.target.value)} onBlur={() => setTouched((previous) => ({ ...previous, price: true }))} placeholder="판매 가격을 입력해 주세요" type="number" min="0" />
            {touched.price && errors.price && <p className={styles.errorMessage}>{errors.price}</p>}
          </label>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="product-tag">태그</label>
            <input id="product-tag" className={`${styles.input} ${touched.tag && errors.tag ? styles.errorInput : ""}`} value={tagInput} onChange={(event) => setTagInput(event.target.value)} onKeyDown={handleAddTag} onBlur={() => setTouched((previous) => ({ ...previous, tag: true }))} placeholder="태그를 입력하고 Enter를 눌러 주세요" />
            {touched.tag && errors.tag && <p className={styles.errorMessage}>{errors.tag}</p>}
          </div>

          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>#{tag}<button type="button" aria-label={`${tag} 태그 삭제`} onClick={() => setTags((previous) => previous.filter((item) => item !== tag))}>×</button></span>
            ))}
          </div>
        </form>
      </main>

      {errorMessage && <ConfirmModal title="상품을 등록하지 못했습니다." description={errorMessage} confirmText="확인" onClose={() => setErrorMessage("")} onConfirm={() => setErrorMessage("")} />}
    </>
  );
}
