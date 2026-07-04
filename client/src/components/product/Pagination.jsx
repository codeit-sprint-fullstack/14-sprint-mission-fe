import styles from './Pagination.module.css'

function Pagination({ page, setPage, pageNumbers }) {
  const pageGroupSize = 5
  const currentGroup = Math.floor((page - 1) / pageGroupSize)
  const startIndex = currentGroup * pageGroupSize
  const visibleGroup = pageNumbers.slice(startIndex, startIndex + pageGroupSize)
  const lastGroup = Math.floor((pageNumbers.length - 1) / pageGroupSize)

  const handlePrev = () => {
    if (currentGroup > 0) {
      setPage((currentGroup - 1) * pageGroupSize + 1)
    }
  }

  const handleNext = () => {
    if (currentGroup < lastGroup) {
      setPage((currentGroup + 1) * pageGroupSize + 1)
    }
  }
  
  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.button} ${styles.arrow}`}
        onClick={handlePrev}
        disabled={currentGroup === 0}
      >
        &lt;
      </button>
      {visibleGroup.map((pageNum) => (
        <button 
          className={`${styles.button} ${styles.number} ${pageNum === page ? styles.active : ''}`}
          key={pageNum}
          onClick={() => setPage(pageNum)}
        >
          {pageNum}
        </button>
      ))}
      <button
        className={`${styles.button} ${styles.arrow}`}
        onClick={handleNext}
        disabled={currentGroup === lastGroup}
      >
        &gt;
      </button>
    </div>
  )
}

export default Pagination