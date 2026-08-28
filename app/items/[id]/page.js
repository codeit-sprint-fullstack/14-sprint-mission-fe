import Image from "next/image";
import { getProduct } from "@/services/ProductService";
import ProductLikeButton from "@/components/ProductLikeButton";
import styles from "./detail.module.css";
import ProductMoreMenu from "./ProductMoreMenu";
import ProductInquirySection from "./ProductInquirySection";
import Link from "next/link";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  const product = await getProduct(id);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* 상품 이미지 */}
        <div className={styles.imageBox}>
          <Image
            className={styles.productImage}
            src={product.images?.[0] || "/images/logo/default-product.png"}
            alt={product.name}
            width={500}
            height={500}
          />
        </div>

        {/* 상품 정보 */}
        <div className={styles.info}>
          <div className={styles.header}>
            <div>
              <p className={styles.label}>상품 정보</p>

              <h1 className={styles.title}>{product.name}</h1>
            </div>

            {/* 더보기 */}
            <ProductMoreMenu />
          </div>

          {/* 가격 */}
          <strong className={styles.price}>
            {product.price.toLocaleString()}원
          </strong>

          {/* 상품 설명 */}
          <div className={styles.description}>
            <h2>상품 소개</h2>

            <p>{product.description}</p>
          </div>

          {/* 태그 */}
          {product.tags?.length > 0 && (
            <div className={styles.tags}>
              {product.tags.map((tag) => (
                <span className={styles.tag} key={tag}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 작성자 정보 */}
          <div className={styles.author}>
            <div className={styles.authorInfo}>
              <Image
                className={styles.authorImage}
                src={product.writer?.image || "/images/board/ic_profile.svg"}
                alt={product.writer?.nickname || "작성자"}
                width={40}
                height={40}
              />

              <div className={styles.authorText}>
                <span className={styles.authorName}>
                  {product.writer?.nickname}
                </span>

                <span className={styles.createdAt}>
                  {new Date(product.createdAt).toLocaleDateString("ko-KR")}
                </span>
              </div>
            </div>

            <div className={styles.authorLike}>
              <ProductLikeButton
                productId={product.id}
                initialFavoriteCount={product.favoriteCount}
              />
            </div>
          </div>
        </div>
      </div>
      {/* 문의하기 */}
      <ProductInquirySection
        productId={product.id}
        initialInquiries={product.comments ?? []}
      />


    </main>
  );
}
