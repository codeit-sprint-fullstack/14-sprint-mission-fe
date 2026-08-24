"use client";

import { favoriteProduct, unfavoriteProduct } from "@/lib/productApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import styles from "./FavoriteButton.module.css";

export default function FavoriteButton({
  productId,
  isFavorite,
  favoriteCount,
}) {
  const queryClient = useQueryClient();

  const { mutate: toggleFavorite, isPending } = useMutation({
    mutationFn: () =>
      isFavorite ? unfavoriteProduct(productId) : favoriteProduct(productId),

    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(
        ["products", "detail", String(productId)],
        (oldProduct) => ({
          ...oldProduct,
          favoriteCount: updatedProduct.favoriteCount,
          isFavorite: updatedProduct.isFavorite,
        }),
      );
    },
  });

  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => toggleFavorite()}
      disabled={isPending}
    >
      <Image
        src={
          isFavorite
            ? "/images/favorite_active.png"
            : "/images/favorite_inactive.png"
        }
        alt=""
        width={32}
        height={32}
      />

      <span>{favoriteCount}</span>
    </button>
  );
}
