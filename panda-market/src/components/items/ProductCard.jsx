'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from '@/components/items/productCard.module.css'

const DEFAULT_PRODUCT_IMAGE = '/img_product_default.png'

// Next Image에 허용된 외부 이미지 호스트
const ALLOWED_IMAGE_HOSTS = new Set([
  'example.com',
  'placecats.com',
  'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
  'loremflickr.com',
  'i.imgur.com',
  'no-cdn.shortpixel.ai',
])

// 이미지 URL 형식과 허용 호스트를 검사하고, 사용할 수 없으면 기본 이미지 반환
function getProductImage(images) {
  const imageUrl = images?.[0]?.trim()

  if (!imageUrl) {
    return DEFAULT_PRODUCT_IMAGE
  }

  try {
    const url = new URL(imageUrl)
    const isAllowedProtocol = url.protocol === 'https:'
    const isAllowedHost = ALLOWED_IMAGE_HOSTS.has(url.hostname)

    if (!isAllowedProtocol || !isAllowedHost) {
      return DEFAULT_PRODUCT_IMAGE
    }

    return imageUrl
  } catch {
    return DEFAULT_PRODUCT_IMAGE
  }
}

function ProductCard({ product }) {
  const { name, price, images, favoriteCount } = product
  const initialProductImage = getProductImage(images)
  const [productImage, setProductImage] = useState(initialProductImage)

  // 실제 이미지 로딩에 실패하면 기본 이미지로 교체
  function onProductImageError() {
    if (productImage === DEFAULT_PRODUCT_IMAGE) return

    setProductImage(DEFAULT_PRODUCT_IMAGE)
  }

  return (
    <div className={styles.productCard}>
      <div className={styles.productInfo}>
        {/* 외부 이미지는 Next 서버 최적화를 거치지 않고 브라우저에서 직접 요청 */}
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
    </div>
  )
}

export default ProductCard
