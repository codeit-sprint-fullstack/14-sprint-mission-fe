'use client'

import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { addProductFavorite, removeProductFavorite } from '@/api/productApi'
import {
  getBestProductRootQueryKey,
  getProductDetailQueryKey,
  getProductListRootQueryKey,
} from '@/constants/queryKeys'
import FavoriteChip from '@/components/common/FavoriteChip'
import ProductTagChip from '@/components/items/ProductTagChip'
import { getProductDetailQueryOptions } from '@/queries/productQueries'
import { DEFAULT_PRODUCT_IMAGE, getProductImage } from '@/utils/productImage'
import formatDate from '@/utils/formatDate'
import styles from '@/app/(with-layout)/items/[id]/itemDetailPage.module.css'

function splitTagsIntoRows(tags, tagsPerRow) {
  const rows = []

  for (let index = 0; index < tags.length; index += tagsPerRow) {
    rows.push(tags.slice(index, index + tagsPerRow))
  }

  return rows
}

const TEMP_COMMENTS = []

function ItemDetailClient({ itemId }) {
  const queryClient = useQueryClient()
  const [accessToken, setAccessToken] = useState(undefined)
  const [failedProductImage, setFailedProductImage] = useState(null)

  useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken'))
  }, [])

  const {
    data: item,
    error,
    isPending,
    isError,
    refetch,
  } = useQuery({
    ...getProductDetailQueryOptions(itemId),
    enabled: Boolean(accessToken),
  })

  const favoriteMutation = useMutation({
    mutationFn: (isCurrentlyFavorite) => {
      if (isCurrentlyFavorite) {
        return removeProductFavorite(itemId)
      }

      return addProductFavorite(itemId)
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: getProductDetailQueryKey(itemId),
        }),
        queryClient.invalidateQueries({
          queryKey: getProductListRootQueryKey(),
        }),
        queryClient.invalidateQueries({
          queryKey: getBestProductRootQueryKey(),
        }),
      ])
    },
  })

  const validatedProductImage = getProductImage(item?.images)
  const productImage =
    failedProductImage === validatedProductImage
      ? DEFAULT_PRODUCT_IMAGE
      : validatedProductImage

  function onProductImageError() {
    if (productImage === DEFAULT_PRODUCT_IMAGE) return

    setFailedProductImage(productImage)
  }

  function handleToggleFavorite() {
    if (favoriteMutation.isPending) return

    favoriteMutation.mutate(item.isFavorite === true)
  }

  if (accessToken === undefined) {
    return (
      <article className={styles.itemDetailPage}>
        <p role="status" aria-live="polite">
          로그인 상태를 확인하고 있습니다.
        </p>
      </article>
    )
  }

  if (!accessToken) {
    return (
      <article className={styles.itemDetailPage}>
        <p>상품 상세 정보를 확인하려면 로그인이 필요합니다.</p>
        <Link className={styles.itemDetailSigninLink} href="/signin">
          로그인하러 가기
        </Link>
      </article>
    )
  }

  if (isPending) {
    return (
      <article className={styles.itemDetailPage}>
        <p role="status" aria-live="polite">
          상품 정보를 불러오고 있습니다.
        </p>
      </article>
    )
  }

  if (isError && error.status === 401) {
    return (
      <article className={styles.itemDetailPage}>
        <p>{error.message}</p>
        <Link className={styles.itemDetailSigninLink} href="/signin">
          다시 로그인하기
        </Link>
      </article>
    )
  }

  if (isError && error.status === 404) {
    return (
      <article className={styles.itemDetailPage}>
        <p>{error.message}</p>
        <Link className={styles.itemDetailErrorBackLink} href="/items">
          상품목록으로 가기
        </Link>
      </article>
    )
  }

  if (isError) {
    return (
      <article className={styles.itemDetailPage}>
        <p>{error.message}</p>
        <button
          className={styles.itemDetailErrorRetryButton}
          type="button"
          onClick={() => refetch()}
        >
          다시 시도
        </button>
      </article>
    )
  }

  return (
    <article className={styles.itemDetailPage}>
      <section className={styles.itemDetailProductSection}>
        <div className={styles.itemDetailImageArea}>
          {/* next/image의 unoptimized prop으로 외부 이미지는 최적화를 건너뛰고 원본 URL을 직접 요청 */}
          <Image
            className={styles.itemDetailProductImage}
            src={productImage}
            alt={item.name}
            width={819.529}
            height={547.941}
            unoptimized={productImage !== DEFAULT_PRODUCT_IMAGE}
            onError={onProductImageError}
          />
        </div>
        <div className={styles.itemDetailProductSummary}>
          <header className={styles.itemDetailProductHeader}>
            <div className={styles.itemDetailTitleGroup}>
              <h1 className={styles.itemDetailProductName}>{item.name}</h1>
              <span className={styles.itemDetailProductPrice}>
                {item.price.toLocaleString('ko-KR')}원
              </span>
            </div>
            <div className={styles.itemDetailMenuArea}>
              <button
                className={styles.itemDetailMenuButton}
                type="button"
                aria-label="상품 메뉴 열기"
              >
                <Image src="/ic_kebab.svg" alt="" width={24} height={24} />
              </button>
            </div>
            <div className={styles.itemDetailHeaderSpacer} aria-hidden="true" />
          </header>
        </div>
        <section className={styles.itemDetailDescriptionArea}>
          <div className={styles.itemDetailDescriptionSpacer} />
          <h2 className={styles.itemDetailDescriptionTitle}>상품 소개</h2>
          <p className={styles.itemDetailDescriptionText}>{item.description}</p>
          <section className={styles.itemDetailTagSection}>
            <h2 className={styles.itemDetailTagTitle}>상품 태그</h2>
            <div
              className={`${styles.itemDetailTagList} ${styles.itemDetailTagListDesktop}`}
            >
              {splitTagsIntoRows(item.tags, 5).map((tagRow, rowIndex) => (
                <div
                  className={styles.itemDetailTagRow}
                  key={`desktop-tag-row-${rowIndex}`}
                >
                  {tagRow.map((tag, tagIndex) => (
                    <ProductTagChip
                      key={`${tag}-${rowIndex * 5 + tagIndex}`}
                      tag={tag}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div
              className={`${styles.itemDetailTagList} ${styles.itemDetailTagListCompact}`}
            >
              {splitTagsIntoRows(item.tags, 3).map((tagRow, rowIndex) => (
                <div
                  className={styles.itemDetailTagRow}
                  key={`compact-tag-row-${rowIndex}`}
                >
                  {/* 같은 이름의 태그도 전체 인덱스를 포함해 서로 다른 key로 구분 */}
                  {tagRow.map((tag, tagIndex) => (
                    <ProductTagChip
                      key={`${tag}-${rowIndex * 3 + tagIndex}`}
                      tag={tag}
                    />
                  ))}
                </div>
              ))}
            </div>
          </section>
        </section>
        <footer className={styles.itemDetailProductMeta}>
          <div className={styles.itemDetailSellerArea}>
            {/* 여러 페이지에서 프로필 사진이 재사용 되므로 프로필 디폴트 이미지 처리에 대한 로직 분리하기 */}
            <Image
              className={styles.itemDetailSellerProfile}
              src="/ic_profile.svg"
              alt="판매자 프로필"
              width={40}
              height={40}
            />
            <div className={styles.itemDetailSellerInfo}>
              <span className={styles.itemDetailSellerNickname}>
                {item.ownerNickname}
              </span>
              <time
                className={styles.itemDetailCreatedAt}
                dateTime={item.createdAt}
              >
                {formatDate(item.createdAt)}
              </time>
            </div>
          </div>
          <FavoriteChip
            isFavorite={item.isFavorite}
            favoriteCount={item.favoriteCount}
            onToggleFavorite={handleToggleFavorite}
            disabled={favoriteMutation.isPending}
          />
        </footer>
        <div className={styles.itemDetailProductSpacer} aria-hidden="true" />
      </section>
      <section className={styles.itemDetailInquirySection}>
        <form className={styles.itemDetailInquiryForm}>
          <h2 className={styles.itemDetailInquiryTitle}>문의하기</h2>
          <textarea
            className={styles.itemDetailInquiryTextarea}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          />
          <button
            className={styles.itemDetailInquirySubmitButton}
            type="submit"
          >
            등록
          </button>
        </form>
        {TEMP_COMMENTS.length === 0 ? (
          <div className={styles.itemDetailInquiryEmpty}>
            <Image
              className={styles.itemDetailInquiryEmptyImage}
              src="/img_inquiry_empty.png"
              alt=""
              width={174}
              height={137}
            />
            <p className={styles.itemDetailInquiryEmptyText}>
              아직 문의가 없어요
            </p>
          </div>
        ) : (
          <div className={styles.itemDetailInquiryList}>
            {/* 상품 문의 목록 영역 */}
          </div>
        )}
      </section>

      <Link className={styles.itemDetailBackLink} href="/items">
        <span className={styles.itemDetailBackText}>목록으로 돌아가기</span>
        <Image
          className={styles.itemDetailBackIcon}
          src="/ic_back.svg"
          alt=""
          width={24}
          height={24}
        />
      </Link>
    </article>
  )
}

export default ItemDetailClient
