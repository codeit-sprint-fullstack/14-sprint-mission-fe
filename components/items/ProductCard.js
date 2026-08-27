import Link from "next/link";

import styles from "./ProductCard.module.css";

function ProductPlaceholder() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <rect width="120" height="120" rx="16" fill="#f3f4f6" />
      <path d="M31 82 51 60l13 14 9-10 17 18H31Z" fill="#d1d5db" />
      <circle cx="78" cy="43" r="9" fill="#d1d5db" />
    </svg>
  );
}

export default function ProductCard({ product, onPrefetch }) {
  const imageUrl = product.images?.[0];

  function handlePrefetch() {
    onPrefetch?.(product.id);
  }

  return (
    <Link
      className={styles.card}
      href={`/items/${product.id}`}
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
      onTouchStart={handlePrefetch}
    >
      <article>
        <div className={styles.imageWrapper}>
          {imageUrl ? (
            // 상품 이미지는 API가 제공하는 임의의 외부 URL이므로 기본 img를 사용한다.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt={product.name} className={styles.image} />
          ) : (
            <div className={styles.placeholder}>
              <ProductPlaceholder />
            </div>
          )}
        </div>

        <div className={styles.info}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.price}>{product.price?.toLocaleString()}원</p>
          <div className={styles.favorite}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M10.6 2.6c1.93 0 3.48 1.53 3.53 3.48v.12c0 1.04-.4 1.94-1.07 2.56l-.2.18v.04c-.1.09-.23.2-.38.33-.34.29-.79.69-1.28 1.12-.98.87-2.12 1.88-2.85 2.51a.5.5 0 0 1-.63 0c-.73-.63-1.9-1.65-2.88-2.51-.5-.43-.95-.83-1.28-1.12l-.36-.32v-.04l-.18-.18A3.62 3.62 0 0 1 1.93 6.2v-.12a3.6 3.6 0 0 1 3.54-3.41c.28 0 .64.1 1.01.3.35.18.66.44.86.73.3.61 1.18.6 1.46-.02.17-.3.47-.58.83-.78.37-.2.73-.3.97-.3Z"
              />
            </svg>
            <span>{product.favoriteCount ?? 0}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
