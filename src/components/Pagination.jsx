import styles from './Pagination.module.css'

function Pagination({ pages, page, setPage }) {
  return (
    <div className={styles.container}>
      <button className={`${styles.button} ${styles.arrow}`}>&lt;</button>
      {pages.map((pageNum) => (
        <button 
          key={pageNum}
          onClick={() => setPage(pageNum)}
          className={`${styles.button} ${styles.number} ${pageNum === page ? styles.active : ''}`}
        >
          {pageNum}
        </button>
      ))}
      <button className={`${styles.button} ${styles.arrow}`}>&gt;</button>
    </div>
  )
}

export default Pagination 