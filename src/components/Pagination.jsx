const PAGE_GROUP_SIZE = 5;

function Pagination({ currentPage, totalPages, onPageChange }) {
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  // 현재 페이지부터 최대 5개까지 번호 버튼으로 노출
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (page) => page >= currentPage && page < currentPage + PAGE_GROUP_SIZE
  );

  const moveTo = (page) => onPageChange(Math.min(Math.max(page, 1), totalPages));

  return (
    <div className="pagination">
      <button className="pageBtn" onClick={() => moveTo(currentPage - PAGE_GROUP_SIZE)} disabled={isFirst}>
        &laquo;
      </button>
      <button className="pageBtn" onClick={() => moveTo(currentPage - 1)} disabled={isFirst}>
        &lt;
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`pageBtn${currentPage === page ? ' active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button className="pageBtn" onClick={() => moveTo(currentPage + 1)} disabled={isLast}>
        &gt;
      </button>
      <button className="pageBtn" onClick={() => moveTo(currentPage + PAGE_GROUP_SIZE)} disabled={isLast}>
        &raquo;
      </button>
    </div>
  );
}

export default Pagination;
