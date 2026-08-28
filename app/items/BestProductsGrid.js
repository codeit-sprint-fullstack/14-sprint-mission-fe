"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { likeProduct } from "@/services/ProductService";
import { useWindowWidth } from "@/utils/WindowWidth";
import styles from "./items.module.css";

export default function BestProductsGrid({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const windowWidth = useWindowWidth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const visibleCount = !mounted ? 4 : windowWidth < 1200 ? 2 : 4;
  const visibleProducts = products.slice(0, visibleCount);

  const handleLike = async (productId) => {
    try {
      const updated = await likeProduct(productId);

      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId
            ? { ...p, favoriteCount: updated.favoriteCount }
            : p,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.bestGrid}>
      {visibleProducts.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <Link href={`/items/${product.id}`} className={styles.productLink}>
            <div className={styles.imageWrapper}>
              <Image
                src={product.images?.[0] || "/images/logo/default-product.png"}
                alt={product.name}
                fill
                sizes="(max-width: 1199px) 50vw, 25vw"
                className={styles.productImage}
              />
            </div>

            <div className={styles.productInfo}>
              <p className={styles.productName}>{product.name}</p>

              <strong className={styles.productPrice}>
                {product.price.toLocaleString()}원
              </strong>
            </div>
          </Link>

          <div className={styles.productFavorite}>
            <button type="button" onClick={() => handleLike(product.id)}>
              <Image
                src="/images/icons/ic_empty_heart.svg"
                alt="좋아요"
                width={16}
                height={16}
              />
            </button>

            <span>{product.favoriteCount}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
