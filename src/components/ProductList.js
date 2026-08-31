import Link from "next/link";

import styles from "@/styles/Items.module.css";

// 상품 목록 출력
export default function ProductList({ products }) {
  // 등록된 상품이 없는 경우
  if (products.length === 0) {
    return (
      <p className={styles.productListEmpty}>
        등록된 상품이 없습니다.
      </p>
    );
  }

  return (
    <>
      {products.map((product) => {
        const formattedPrice = Number(
          product.price ?? 0,
        ).toLocaleString("ko-KR");

        return (
          <Link
            key={product.id}
            href={`/items/${product.id}`}
            className={styles.productCardLink}
          >
            <article className={styles.productCard}>
              <div className={styles.productCardImageWrapper}>
                <img
                  src={product.images?.[0] || "/img/img_default.svg"}
                  alt={product.name}
                  className={styles.productCardImage}
                />
              </div>

              <div className={styles.productCardInformation}>
                <p className={styles.productCardName}>
                  {product.name}
                </p>

                <p className={styles.productCardPrice}>
                  {formattedPrice}원
                </p>
              </div>
            </article>
          </Link>
        );
      })}
    </>
  );
}