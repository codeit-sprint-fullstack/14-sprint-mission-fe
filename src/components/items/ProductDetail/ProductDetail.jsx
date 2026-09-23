"use client";

import Button from "@/components/Button/Button";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getApiErrorMessage } from "@/lib/apiError";
import { getProduct } from "@/lib/productApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import InquirySection from "../InquirySection/InquirySection";
import ProductInfo from "../ProductInfo/ProductInfo";
import styles from "./ProductDetail.module.css";

export default function ProductDetail({ itemId }) {
  const {
    data: currentUser,
    isCheckingAuth,
    hasAuthError,
    error: authError,
  } = useCurrentUser();
  const router = useRouter();

  const {
    data: product,
    isPending,
    isError,
    error: productError,
  } = useQuery({
    queryKey: ["products", "detail", itemId],
    queryFn: () => getProduct(itemId),
    enabled: Boolean(currentUser),
  });

  useEffect(() => {
    if (!isCheckingAuth && !hasAuthError && !currentUser) {
      router.replace("/signin");
    }
  }, [currentUser, isCheckingAuth, hasAuthError, router]);

  if (isCheckingAuth) {
    return <p className={styles.status}>로그인 정보를 확인하는 중입니다...</p>;
  }

  if (hasAuthError) {
    const authErrorMessage = getApiErrorMessage(
      authError,
      "로그인 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
    );

    return <p className={styles.status}>{authErrorMessage}</p>;
  }

  if (!currentUser) {
    return null;
  }

  if (isPending) {
    return <p className={styles.status}>상품을 불러오는 중입니다...</p>;
  }

  if (isError) {
    const productErrorMessage = getApiErrorMessage(
      productError,
      "상품을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
    );

    return <p className={styles.status}>{productErrorMessage}</p>;
  }

  const isOwner = currentUser.id === product.owner.id;

  return (
    <div className={styles.detailPage}>
      <ProductInfo product={product} isOwner={isOwner} />

      <hr className={styles.divider} />

      <InquirySection productId={product.id} currentUserId={currentUser.id} />

      <div className={styles.backButton}>
        <Button href="/items" className={styles.backButtonContent}>
          목록으로 돌아가기
          <Image src="/images/ic_back.svg" alt="" width={24} height={24} />
        </Button>
      </div>
    </div>
  );
}
