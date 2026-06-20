import styles from './Pagination.module.css'

function Pagination({ pages }) {
  return (
    <div className={styles.container}>
      <button className={`${styles.button} ${styles.arrow}`}>&lt;</button>
      {pages.map((pageNum) => (
        <button className={`${styles.button} ${styles.number}`} key={pageNum}>{pageNum}</button>
      ))}
      <button className={`${styles.button} ${styles.arrow}`}>&gt;</button>
    </div>
  )
}

export default Pagination 