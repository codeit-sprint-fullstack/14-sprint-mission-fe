import styles from './Pagination.module.css'

function Pagination({ pages, page, setPage }) {
  const currentGroup = Math.floor((page - 1) / 5)
  const start = currentGroup * 5
  const visiblePages = pages.slice(start, start + 5)

  const handleNext = () => {
    if (currentGroup < Math.floor((pages.length - 1) / 5)) {
      setPage((currentGroup + 1) * 5 + 1)
    }
  }

  const handlePrev = () => {
    if (currentGroup > 0) {
      setPage((currentGroup - 1) * 5 + 1)
    }
  }

  return (
    <div className={styles.container}>
      <button 
      className={`${styles.button} ${styles.arrow}`}
      onClick={handlePrev}
      >
        &lt;
      </button>
      {visiblePages.map((pageNum) => (
        <button 
          key={pageNum}
          onClick={() => setPage(pageNum)}
          className={`${styles.button} ${styles.number} ${pageNum === page ? styles.active : ''}`}
        >
          {pageNum}
        </button>
      ))}
      <button 
        className={`${styles.button} ${styles.arrow}`}
        onClick={handleNext}
      >
        &gt;
      </button>
    </div>
  )
}

export default Pagination 