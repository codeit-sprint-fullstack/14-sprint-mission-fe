import styles from '@/components/items/ProductTagChip.module.css'

function ProductTagChip({ tag }) {
  return <span className={styles.productTagChip}>#{tag}</span>
}

export default ProductTagChip
