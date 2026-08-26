"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const imageUrl = product.images?.[0] || "/images/img_default.png";

  function handleImageError(event) {
    event.currentTarget.src = "/images/img_default.png";
  }

  return (
    <Link href={`/items/${product.id}`} className={styles.card}>
      <div className={styles.imageBox}>
        {/* 사용자 등록 이미지 URL은 호스트가 고정되지 않아 img를 사용 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.image}
          src={imageUrl}
          alt={product.name}
          onError={handleImageError}
        />
      </div>

      <div className={styles.info}>
        <p className={styles.name}>{product.name}</p>

        <p className={styles.price}>{product.price.toLocaleString()}원</p>

        <p className={styles.favorite}>
          <Image src="/images/ic_heart.svg" alt="" width={16} height={16} />
          {product.favoriteCount ?? 0}
        </p>
      </div>
    </Link>
  );
}
