import './Pagination.css'

const getVisiblePages = (page, totalPages) => {
  const maxVisiblePages = 5
  let startPage = page - 2
  let endPage = page + 2

  if (startPage < 1) {
    startPage = 1
    endPage = Math.min(totalPages, maxVisiblePages)
  }

  if (endPage > totalPages) {
    endPage = totalPages
    startPage = Math.max(1, totalPages - maxVisiblePages + 1)
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  )
}

const Pagination = ({ page, totalPages, onPageChange }) => {
  const pageCount = Math.max(totalPages, 1)
  const pages = getVisiblePages(page, pageCount)

  return (
    <div className="pagination">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        &lt;
      </button>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={pageNumber === page ? 'active' : ''}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        &gt;
      </button>
    </div>
  )
}

export default Pagination
