import styles from '@/components/common/Pagination.module.css'

function Pagination({ page, totalPages, pageNumbers, onChangePage }) {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        disabled={page <= 1}
        onClick={() => onChangePage(page - 1)}
      >
        &lt;
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`${styles.paginationButton} ${
            page === pageNumber ? styles.active : ''
          }`}
          onClick={() => onChangePage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className={styles.paginationButton}
        disabled={page >= totalPages}
        onClick={() => onChangePage(page + 1)}
      >
        &gt;
      </button>
    </div>
  )
}

export default Pagination
