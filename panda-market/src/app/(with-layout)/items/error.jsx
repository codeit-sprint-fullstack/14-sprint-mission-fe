'use client'

import styles from './itemsPage.module.css'

function ItemsError({ reset }) {
  return (
    <div className={styles.marketBackground}>
      <div className={styles.marketPage}>
        <div className={styles.itemsState}>
          <p role="alert">상품 목록을 불러오지 못했습니다.</p>
          <button
            className={styles.itemsRetryButton}
            type="button"
            onClick={() => reset()}
          >
            다시 시도
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemsError
