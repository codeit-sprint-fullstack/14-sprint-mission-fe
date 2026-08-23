import styles from './itemDetailPage.module.css'

function ItemDetailLoading() {
  return (
    <div className={`${styles.itemDetailPage} ${styles.itemDetailState}`}>
      <p role="status" aria-live="polite">
        상품 정보를 불러오고 있습니다.
      </p>
    </div>
  )
}

export default ItemDetailLoading
