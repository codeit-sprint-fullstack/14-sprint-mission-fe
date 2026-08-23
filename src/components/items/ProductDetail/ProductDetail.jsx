"use client";

import Button from "@/components/Button/Button";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getProduct } from "@/lib/productApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProductInfo from "../ProductInfo/ProductInfo";
import styles from "./ProductDetail.module.css";

export default function ProductDetail({ itemId }) {
  const { data: currentUser, isCheckingAuth } = useCurrentUser();
  const router = useRouter();

  const {
    data: product,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["products", "detail", itemId],
    queryFn: () => getProduct(itemId),
    enabled: Boolean(currentUser),
  });

  useEffect(() => {
    if (!isCheckingAuth && !currentUser) {
      router.replace("/signin");
    }
  }, [currentUser, isCheckingAuth, router]);

  if (isCheckingAuth) {
    return <p className={styles.status}>로그인 정보를 확인하는 중입니다...</p>;
  }

  if (!currentUser) {
    return null;
  }

  if (isPending) {
    return <p className={styles.status}>상품을 불러오는 중입니다...</p>;
  }

  if (isError) {
    return <p className={styles.status}>상품을 불러오지 못했습니다.</p>;
  }

  const isOwner = currentUser?.id === product.ownerId;

  return (
    <>
      <ProductInfo product={product} isOwner={isOwner} />

      <div className={styles.backButton}>
        <Button href="/items" className={styles.backButtonContent}>
          목록으로 돌아가기
          <Image src="/images/ic_back.svg" alt="" width={24} height={24} />
        </Button>
      </div>
    </>
  );
}
