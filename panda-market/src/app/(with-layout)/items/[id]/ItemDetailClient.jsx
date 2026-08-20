'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { getProductDetailQueryOptions } from '@/queries/productQueries'
import formatDate from '@/utils/formatDate'
import styles from '@/app/(with-layout)/items/[id]/itemDetailPage.module.css'

const TEMP_COMMENTS = []

function ItemDetailClient({ itemId }) {
  const [accessToken, setAccessToken] = useState(undefined)

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
          <Image
            className={styles.itemDetailProductImage}
            src="/img_product_default.png"
            alt="상품 이미지"
            width={819.529}
            height={547.941}
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
            <div className={styles.itemDetailTagList}>
              {item.tags.map((tag) => (
                <span className={styles.itemDetailTag} key={tag}>
                  #{tag}
                </span>
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
          <button
            className={styles.itemDetailFavoriteButton}
            type="button"
            aria-label={`좋아요 ${item.favoriteCount}개`}
          >
            {/* 임시 구현으로 현재 좋아요 클릭한 상태로 UI 구현, 미선택시 빈 하트로 전환해야함 */}
            <Image
              className={styles.itemDetailFavoriteIcon}
              src="/ic_full_heart.svg"
              alt=""
              width={26.8}
              height={23.3}
            />
            <span className={styles.itemDetailFavoriteCount}>
              {item.favoriteCount}
            </span>
          </button>
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
