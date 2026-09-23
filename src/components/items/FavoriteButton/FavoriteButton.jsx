"use client";

import AlertModal from "@/components/AlertModal/AlertModal";
import { getApiErrorMessage } from "@/lib/apiError";
import { likeProduct, unlikeProduct } from "@/lib/productApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import styles from "./FavoriteButton.module.css";

export default function FavoriteButton({ productId, isLiked, likeCount }) {
  const queryClient = useQueryClient();

  const {
    mutate: toggleLike,
    isPending,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: () =>
      isLiked ? unlikeProduct(productId) : likeProduct(productId),

    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(
        ["products", "detail", String(productId)],
        (oldProduct) => ({
          ...oldProduct,
          likeCount: updatedProduct.likeCount,
          isLiked: updatedProduct.isLiked,
        }),
      );
    },
  });

  const errorMessage = getApiErrorMessage(
    error,
    "좋아요 처리에 실패했습니다. 잠시 후 다시 시도해 주세요.",
  );

  return (
    <>
      <button
        type="button"
        className={styles.button}
        onClick={() => toggleLike()}
        disabled={isPending}
      >
        <Image
          src={
            isLiked
              ? "/images/favorite_active.png"
              : "/images/favorite_inactive.png"
          }
          alt=""
          width={32}
          height={32}
        />

        <span>{likeCount}</span>
      </button>

      <AlertModal isOpen={isError} message={errorMessage} onClose={reset} />
    </>
  );
}
