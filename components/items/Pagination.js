import styles from "./Pagination.module.css";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const maxVisiblePages = 5;
  let startPage = Math.max(page - 2, 1);
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <nav className={styles.pagination} aria-label="상품 목록 페이지">
      <button
        type="button"
        className={styles.arrowButton}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="이전 페이지"
      >
        <span aria-hidden="true">‹</span>
      </button>

      {visiblePages.map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          className={`${styles.pageButton} ${page === pageNumber ? styles.active : ""}`}
          onClick={() => onPageChange(pageNumber)}
          aria-current={page === pageNumber ? "page" : undefined}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        className={styles.arrowButton}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="다음 페이지"
      >
        <span aria-hidden="true">›</span>
      </button>
    </nav>
  );
}
