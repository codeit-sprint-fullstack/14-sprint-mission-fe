"use client";

import useResponsiveValue from "@/hooks/useResponsiveValue";
import { getProducts } from "@/lib/productApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./BestProducts.module.css";

export default function BestProducts() {
  const pageSize = useResponsiveValue({
    mobile: 1,
    tablet: 2,
    desktop: 4,
  });

  const { data, isPending, isError } = useQuery({
    queryKey: ["products", "best", { pageSize }],
    queryFn: () =>
      getProducts({
        page: 1,
        pageSize,
        orderBy: "favorite",
      }),
    enabled: pageSize !== null,
    placeholderData: keepPreviousData,
  });

  const products = data?.list ?? [];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>베스트 상품</h2>

      {isPending ? (
        <p className={styles.status}>상품을 불러오는 중입니다...</p>
      ) : isError ? (
        <p className={styles.status}>상품을 불러오지 못했습니다.</p>
      ) : products.length === 0 ? (
        <p className={styles.status}>상품이 없습니다.</p>
      ) : (
        <div className={styles.list}>
          {products.map((product) => (
            <div key={product.id} className={styles.item}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
