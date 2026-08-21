"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { likeProduct } from "@/services/ProductService";
import { useWindowWidth } from "@/utils/WindowWidth";
import styles from "./items.module.css";

export default function ProductGrid({ initialProducts, page, orderBy, keyword }) {
  const [products, setProducts] = useState(initialProducts);
  const windowWidth = useWindowWidth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  // 화면 너비에 맞는 pageSize와 서버가 내려준 개수가 다르면 재요청
  useEffect(() => {
    const expectedPageSize =
      windowWidth < 744 ? 4 : windowWidth < 1200 ? 6 : 10;

    if (expectedPageSize !== initialProducts.length && page === 1) {
      const params = new URLSearchParams({
        page: "1",
        orderBy,
        pageSize: String(expectedPageSize),
      });
      if (keyword) params.set("keyword", keyword);
      router.replace(`${pathname}?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);

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
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <Image
            src={product.images?.[0] || "/images/logo/default-product.png"}
            alt={product.name}
            width={280}
            height={280}
            className={styles.productImage}
          />

          <div className={styles.productInfo}>
            <p className={styles.productName}>{product.name}</p>

            <strong className={styles.productPrice}>
              {product.price.toLocaleString()}원
            </strong>

            <div className={styles.productFavorite}>
              <Image
                src="/images/icons/ic_heart.svg"
                alt="좋아요"
                width={16}
                height={16}
                onClick={() => handleLike(product.id)}
                style={{ cursor: "pointer" }}
              />
              <span>{product.favoriteCount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}