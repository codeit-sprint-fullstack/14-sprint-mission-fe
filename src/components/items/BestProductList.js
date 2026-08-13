import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/productsApi";
import ProductCard from "./ProductCard";
import styles from "./BestProductList.module.css";

export default function BestProductList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bestProducts"],
    queryFn: () =>
      getProducts({
        page: 1,
        pageSize: 4,
        orderBy: "favorite",
      }),
  });

  const bestProducts = data?.list || [];

  return (
    <section className={styles.bestSection}>
      <h2 className={styles.bestTitle}>베스트 상품</h2>

      {isLoading && (
        <p className={styles.message}>
          베스트 상품을 불러오는 중입니다.
        </p>
      )}

      {isError && (
        <p className={styles.message}>
          베스트 상품을 불러오지 못했습니다.
        </p>
      )}

      {!isLoading && !isError && (
        <div className={styles.bestGrid}>
          {bestProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isBest={true}
            />
          ))}
        </div>
      )}
    </section>
  );
}
