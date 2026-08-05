import style from './pagination.module.css';

const GROUP_SIZE = 5; // 한 번에 보여줄 페이지 번호 개수

function Pagination({ currentPage, totalPages, onPageChange }) {
  // 마지막 그룹에서 페이지 번호가 그룹 사이즈 보다 적게 남아도 start가 밀리지 않도록 상한선 설정해뒀습니다
  const maxStart = Math.max(totalPages - GROUP_SIZE + 1, 1);
  const start = Math.min(Math.max(currentPage - GROUP_SIZE + 1, 1), maxStart);
  const end = Math.min(start + GROUP_SIZE - 1, totalPages);

  // start ~ end 범위의 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let page = start; page <= end; page++) pageNumbers.push(page);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1); // 첫 페이지에서는 이동 안 함
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1); // 마지막 페이지에서는 이동 안 함
  };

  return (
    <div className={style.pagination_wrap}>
      <button
        type="button"
        className={style.btn_left}
        disabled={currentPage === 1}
        onClick={handlePrev}
      >
        {/* <img src="/assets/icon_btn_left.png" alt="이전 페이지" /> */}
        <span>{"<"}</span>
      </button>

      <ul className={style.page}>
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              type="button"
              className={`${style.page_number} ${page === currentPage ? style.page_number_active : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={style.btn_right}
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        <span>{">"}</span>
      </button>
    </div>
  );
}



export default Pagination;
