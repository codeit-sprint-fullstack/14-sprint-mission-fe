"use client";

import { likeProduct, unlikeProduct } from "@/lib/productApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import styles from "./FavoriteButton.module.css";

export default function FavoriteButton({ productId, isLiked, likeCount }) {
  const queryClient = useQueryClient();

  const { mutate: toggleLike, isPending } = useMutation({
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

  return (
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
  );
}
