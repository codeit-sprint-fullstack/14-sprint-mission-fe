import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import ConfirmModal from "@/components/items/ConfirmModal";
import useHasAccessToken from "@/hooks/useHasAccessToken";
import useProductFormValidation from "@/hooks/useProductFormValidation";
import { getProduct, updateProduct, uploadProductImage } from "@/lib/api/products";
import { getMe } from "@/lib/api/users";
import { removeAccessToken } from "@/lib/auth";
import { queryKeys } from "@/lib/queryKeys";
import styles from "@/styles/ItemRegistrationPage.module.css";

function ItemEditForm({ itemId, product }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const objectUrlRef = useRef("");
  const [name, setName] = useState(product.name ?? "");
  const [description, setDescription] = useState(product.description ?? "");
  const [price, setPrice] = useState(String(product.price ?? ""));
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(product.tags ?? []);
  const [image, setImage] = useState(product.images?.[0] ?? null);
  const [previewUrl, setPreviewUrl] = useState(product.images?.[0] ?? "");
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState({ image: false, name: false, description: false, price: false, tag: false });

  const { errors, isValid } = useProductFormValidation({ name, description, price, tags, tagInput, image });

  useEffect(() => () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
  }, []);

  const updateMutation = useMutation({
    mutationFn: async () => {
      const imageUrl = typeof image === "string" ? image : await uploadProductImage(image);
      return updateProduct({
        productId: itemId,
        productData: {
          name: name.trim(),
          description: description.trim(),
          price: Number(price),
          tags,
          images: [imageUrl],
        },
      });
    },
    onSuccess: async (updatedProduct) => {
      queryClient.setQueryData(queryKeys.products.detail(itemId), updatedProduct);
      await queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      router.replace(`/items/${itemId}`);
    },
    onError: (error) => setErrorMessage(error.response?.data?.message || "상품 수정에 실패했습니다."),
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
    if (!isValid || updateMutation.isPending) return;
    updateMutation.mutate();
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <h1>상품 수정하기</h1>
          <button type="submit" disabled={!isValid || updateMutation.isPending}>{updateMutation.isPending ? "수정 중..." : "수정"}</button>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>상품 이미지</span>
          <label className={`${styles.imageInput} ${touched.image && errors.image ? styles.errorInput : ""}`}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewUrl ? (
              // API 이미지 또는 로컬 blob URL을 사용한다.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewUrl} alt="상품 이미지 미리보기" />
            ) : <span><b>＋</b>이미지 등록</span>}
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
          {tags.map((tag) => <span key={tag} className={styles.tag}>#{tag}<button type="button" aria-label={`${tag} 태그 삭제`} onClick={() => setTags((previous) => previous.filter((item) => item !== tag))}>×</button></span>)}
        </div>
      </form>

      {errorMessage && <ConfirmModal title="상품을 수정하지 못했습니다." description={errorMessage} confirmText="확인" onClose={() => setErrorMessage("")} onConfirm={() => setErrorMessage("")} />}
    </>
  );
}

export default function ItemEditPage() {
  const router = useRouter();
  const itemId = router.query.itemId;
  const hasToken = useHasAccessToken();

  useEffect(() => {
    if (!router.isReady) return;
    if (!hasToken) router.replace(`/signin?redirect=${encodeURIComponent(router.asPath)}`);
  }, [hasToken, router]);

  const enabled = router.isReady && hasToken && Boolean(itemId);
  const productQuery = useQuery({ queryKey: queryKeys.products.detail(itemId), queryFn: () => getProduct(itemId), enabled });
  const userQuery = useQuery({ queryKey: queryKeys.me, queryFn: getMe, enabled, retry: false });

  useEffect(() => {
    if (userQuery.error?.response?.status !== 401) return;
    removeAccessToken();
    router.replace(`/signin?redirect=${encodeURIComponent(router.asPath)}`);
  }, [router, userQuery.error]);

  if (!hasToken || !router.isReady || productQuery.isPending || userQuery.isPending) {
    return <main className={styles.state}>상품 정보를 불러오는 중입니다...</main>;
  }
  if (productQuery.isError) {
    return <main className={styles.state}>상품 정보를 불러오지 못했습니다.<Link href="/items">목록으로 돌아가기</Link></main>;
  }
  if (userQuery.isError) {
    return <main className={styles.state}>사용자 정보를 확인하지 못했습니다.<Link href={`/items/${itemId}`}>상품으로 돌아가기</Link></main>;
  }
  if (userQuery.data?.id !== productQuery.data?.ownerId) {
    return <main className={styles.state}>상품을 수정할 권한이 없습니다.<Link href={`/items/${itemId}`}>상품으로 돌아가기</Link></main>;
  }

  return (
    <>
      <Head><title>상품 수정 | 판다마켓</title></Head>
      <main className={styles.main}>
        <ItemEditForm key={String(itemId)} itemId={itemId} product={productQuery.data} />
      </main>
    </>
  );
}
