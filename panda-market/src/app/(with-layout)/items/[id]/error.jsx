'use client'

import styles from './itemDetailPage.module.css'

function ItemDetailError({ reset }) {
  return (
    <div className={`${styles.itemDetailPage} ${styles.itemDetailState}`}>
      <p role="alert">상품 정보를 불러오지 못했습니다.</p>
      <button
        className={styles.itemDetailErrorRetryButton}
        type="button"
        onClick={() => reset()}
      >
        다시 시도
      </button>
    </div>
  )
}

export default ItemDetailError
