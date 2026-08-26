import styles from "./Pagination.module.css";

export default function Pagination({
  page,
  totalCount,
  pageSize,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages === 0) {
    return null;
  }

  const pageGroupSize = 5;
  const currentGroup = Math.floor((page - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);
  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={() => onPageChange(startPage - 1)}
        disabled={startPage === 1}
      >
        {"<"}
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`${styles.button} ${
            page === pageNumber ? styles.active : ""
          }`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className={styles.button}
        onClick={() => onPageChange(endPage + 1)}
        disabled={endPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
}
