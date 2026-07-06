function Pagination({
  page,
  totalPages,
  pageNumbers,
  onChangePage,
}) {
  return (
    <div className='pagination'>
      <button
        disabled={page <= 1}
        onClick={() => onChangePage(page - 1)}
      >
        &lt;
      </button>

      {pageNumbers.map(pageNumber => (
        <button
          key={pageNumber}
          className={page === pageNumber ? 'active' : ''}
          onClick={() => onChangePage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        disabled={page >= totalPages}
        onClick={() => onChangePage(page + 1)}
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination;