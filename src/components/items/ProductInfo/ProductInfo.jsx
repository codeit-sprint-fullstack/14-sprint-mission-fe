import { formatDate } from "@/lib/dateUtils";
import Image from "next/image";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import ProductActionMenu from "../ProductActionMenu/ProductActionMenu";
import styles from "./ProductInfo.module.css";

export default function ProductInfo({ product, isOwner }) {
  const imageUrl = product.images?.[0] || "/images/img_default.png";

  return (
    <section className={styles.productInfo}>
      <div className={styles.imageBox}>
        {/* 사용자 등록 이미지 URL은 호스트가 고정되지 않아 img를 사용 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={product.name}
          onError={(event) => {
            event.currentTarget.src = "/images/img_default.png";
          }}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.summary}>
          <div className={styles.titleRow}>
            <h1 className={styles.name}>{product.name}</h1>

            {isOwner && <ProductActionMenu productId={product.id} />}
          </div>

          <p className={styles.price}>{product.price.toLocaleString()}원</p>
        </div>

        <hr className={styles.divider} />

        <div className={styles.descriptionSection}>
          <h2 className={styles.sectionTitle}>상품 소개</h2>
          <p className={styles.description}>{product.description}</p>
        </div>

        {product.tags.length > 0 && (
          <div className={styles.tagSection}>
            <h2 className={styles.sectionTitle}>상품 태그</h2>

            <div className={styles.tagList}>
              {product.tags.map((tag) => (
                <span key={tag} className={styles.tagChip}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className={styles.meta}>
          <div className={styles.sellerInfo}>
            <Image src="/images/ic_profile.svg" alt="" width={40} height={40} />

            <div className={styles.sellerText}>
              <span className={styles.nickname}>{product.ownerNickname}</span>
              <time className={styles.date}>
                {formatDate(product.createdAt)}
              </time>
            </div>
          </div>

          <div className={styles.favoriteArea}>
            <FavoriteButton
              productId={product.id}
              isFavorite={product.isFavorite}
              favoriteCount={product.favoriteCount}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
