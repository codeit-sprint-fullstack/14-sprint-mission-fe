"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteProductFavorite,
  postProductFavorite,
} from "../lib/api/products";
import styles from "./Favorite.module.css";

export default function Favorite({ id, isFavorite, count }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      isFavorite ? deleteProductFavorite(id) : postProductFavorite(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["item", id] }),
  });

  function handleClick() {
    if (isPending) return;
    mutate();
  }
  return (
    <button className={styles.favorite} type="button" onClick={handleClick}>
      {isFavorite ? "♥" : "♡"}
      <span>{count}</span>
    </button>
  );
}
