"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getProduct,
  likeProduct,
  unlikeProduct,
} from "@/services/ProductService";

export default function ProductLikeButton({
  productId,
  initialFavoriteCount,
}) {
  const [favoriteCount, setFavoriteCount] = useState(initialFavoriteCount);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkLikeStatus() {
      const token = localStorage.getItem("accessToken");

      if (!token) return;

      try {
        const product = await getProduct(productId, token);
        setIsLiked(product.isLiked);
      } catch (error) {
        console.error(error);
      }
    }

    checkLikeStatus();
  }, [productId]);

  async function handleLike() {
    if (loading) return;

    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    setLoading(true);

    try {
      if (isLiked) {
        await unlikeProduct(productId);

        setFavoriteCount((prev) => prev - 1);
        setIsLiked(false);
      } else {
        await likeProduct(productId);

        setFavoriteCount((prev) => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={loading}
      aria-label={isLiked ? "좋아요 취소" : "좋아요"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        padding: 0,
        border: "none",
        background: "transparent",
        cursor: loading ? "default" : "pointer",
      }}
    >
      <Image
        src={
          isLiked
            ? "/images/icons/ic_heart.svg"
            : "/images/icons/ic_empty_heart.svg"
        }
        alt=""
        width={20}
        height={20}
      />

      <span
        style={{
          fontSize: "14px",
          color: "#767676",
        }}
      >
        {favoriteCount}
      </span>
    </button>
  );
}