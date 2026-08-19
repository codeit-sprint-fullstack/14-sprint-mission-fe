'use client'

import formatDate from '@/utils/formatDate'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/app/(with-layout)/items/[id]/itemDetailPage.module.css'

const TEMP_ITEM = {
  id: 1,
  name: '아이패드 미니 팔아요',
  price: 500000,
  description:
    '역정이 긴지스랑 주변부 스크래치있습니다만 메인화면보시면 전혀 신경쓰이지않을정도입니다.\n박스 보관중입니다.\n메모리랑 네트워크상으로문제없던거라 뭘 해보질 않아 기능이나 문제점을 못느꼈네요\n잘 안써서 싸게정리합니다 택배거래안합니다.',
  createdAt: '2024-01-02T00:00:00.000Z',
  favoriteCount: 123,
  ownerId: 1,
  ownerNickname: '곰발바닥',
  tags: ['아이패드미니', '애플', '가성비'],
  isFavorite: true,
}

const TEMP_COMMENTS = []

function ItemDetailClient({ itemId }) {
  void itemId

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
              <h1 className={styles.itemDetailProductName}>{TEMP_ITEM.name}</h1>
              <span className={styles.itemDetailProductPrice}>
                {TEMP_ITEM.price.toLocaleString('ko-KR')}원
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
          <p className={styles.itemDetailDescriptionText}>
            {TEMP_ITEM.description}
          </p>
          <section className={styles.itemDetailTagSection}>
            <h2 className={styles.itemDetailTagTitle}>상품 태그</h2>
            <div className={styles.itemDetailTagList}>
              {TEMP_ITEM.tags.map((tag) => (
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
                {TEMP_ITEM.ownerNickname}
              </span>
              <time
                className={styles.itemDetailCreatedAt}
                dateTime={TEMP_ITEM.createdAt}
              >
                {formatDate(TEMP_ITEM.createdAt)}
              </time>
            </div>
          </div>
          <button
            className={styles.itemDetailFavoriteButton}
            type="button"
            aria-label={`좋아요 ${TEMP_ITEM.favoriteCount}개`}
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
              {TEMP_ITEM.favoriteCount}
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
