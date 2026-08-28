'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { DEFAULT_PRODUCT_IMAGE, getProductImage } from '@/utils/productImage'
import styles from '@/components/items/productCard.module.css'

function ProductCard({ product }) {
  const { id, name, price, images, favoriteCount } = product
  const initialProductImage = getProductImage(images)
  const [productImage, setProductImage] = useState(initialProductImage)

  // 실제 이미지 로딩에 실패하면 기본 이미지로 교체
  function onProductImageError() {
    if (productImage === DEFAULT_PRODUCT_IMAGE) return

    setProductImage(DEFAULT_PRODUCT_IMAGE)
  }

  return (
    <Link href={`/items/${id}`} className={styles.productCard}>
      <div className={styles.productInfo}>
        {/* next/image의 unoptimized prop으로 외부 이미지는 최적화를 건너뛰고 원본 URL을 직접 요청 */}
        <Image
          className={styles.productImage}
          src={productImage}
          alt={name}
          width={220}
          height={220}
          unoptimized={productImage !== DEFAULT_PRODUCT_IMAGE}
          onError={onProductImageError}
        />
        <p className={styles.productName}>{name}</p>
        <p className={styles.productPrice}>{price.toLocaleString()}원</p>
        <p className={styles.productFavorite}>
          <Image
            className={styles.favoriteIcon}
            src="/ic_empty_heart.svg"
            alt=""
            width={16}
            height={16}
          />
          {favoriteCount}
        </p>
      </div>
    </Link>
  )
}

export default ProductCard
