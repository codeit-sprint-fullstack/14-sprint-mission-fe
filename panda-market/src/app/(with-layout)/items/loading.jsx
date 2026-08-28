import styles from './itemsPage.module.css'

function ItemsLoading() {
  return (
    <div className={styles.marketBackground}>
      <div className={styles.marketPage}>
        <div className={styles.itemsState}>
          <p role="status" aria-live="polite">
            상품을 불러오는 중입니다.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ItemsLoading
