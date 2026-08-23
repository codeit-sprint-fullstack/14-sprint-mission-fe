import Link from "next/link";
import styles from "./ProductCard.module.css";

const DEFAULT_IMAGE = "/images/default_product.png";

export default function ProductCard({
  product,
  isBest = false,
}) {
  const imageUrl = product.images?.[0] || DEFAULT_IMAGE;
  const formattedPrice = Number(product.price).toLocaleString();

  const cardClassName = isBest
    ? styles.bestProductCard
    : styles.productCard;

  const imageClassName = isBest
    ? styles.bestProductImage
    : styles.productImage;

  function handleImageError(event) {
    event.currentTarget.src = DEFAULT_IMAGE;
  }

  return (
    <Link
      href={`/items/${product.id}`}
      className={cardClassName}
    >
      <img
        className={imageClassName}
        src={imageUrl}
        alt={product.name}
        onError={handleImageError}
      />

      <div className={styles.productInfo}>
        <p className={styles.productName}>{product.name}</p>

        <p className={styles.productPrice}>
          {formattedPrice}원
        </p>

        <p className={styles.favoriteCount}>
          <img
            className={styles.heartIcon}
            src="/images/heart.png"
            alt="좋아요"
          />
          {product.favoriteCount}
        </p>
      </div>
    </Link>
  );
}
