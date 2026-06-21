import styles from './Pagination.module.css'

//페이지 번호를 표시하고 페이지는 이동시키는 역할

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    //페이지가 1개면 버튼이 필요가 없으니 숨기기
    return null
  }

  // 페이지 버튼 총 5개로 고정 설정해서 맨 끝 페이지에서도 버튼이 5개가 다 보이도록
  const maxVisiblePages = 5

  //시작 페이지 계산 / 현재 페이지를 기준으로 왼쪽으로 2칸
  // ex) page = 5, startPage = 3, 화면 : 3 4 5 6 7
  // -1 방지를 위해 startPage가 무조건 1보다 큰 수일 수 있도록 max 사용
  const startPage = Math.max(page - 2, 1)
  // 끝 페이지 계산
  // startPage부터 총 5개의 페이지 버튼을 보여주기 위해 + (5 - 1)
  // ex) startPage = 3이면 endPage = 7 → 화면 : 3 4 5 6 7
  // 마지막 페이지(totalPages)를 넘지 않도록 min 사용
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages)
  // 현재 화면에 보이는 페이지 버튼 개수 계산
  // 공식: 끝 페이지 - 시작 페이지 + 1
  // ex) startPage = 8, endPage = 10 → 10 - 8 + 1 = 3개 (8 9 10)
  // 만약 버튼 개수가 5개보다 적으면 마지막 페이지 근처라 버튼이 부족
  // ex) totalPages = 10, page = 10 → 화면 : 8 9 10 (3개)
  if (endPage - startPage + 1 < maxVisiblePages) {
    // 부족한 버튼 수만큼 startPage를 왼쪽으로 이동
    // ex) endPage = 10이면 startPage = 6 → 화면 : 6 7 8 9 10
    // 1보다 작아지는 것을 방지하기 위해 max 사용
    startPage = Math.max(endPage - maxVisiblePages + 1, 1)
  }

  const visiblePages = [] //화면에 보이는 페이지를 저장할 배열

  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i) //화면에 보일 페이지를 하나씩 담음 ex) [3, 4, 5, 6, 7 ]
  }

  // ( < ) 버튼 클릭 시 이전 페이지로 돌아가게끔
  const handlePrevClick = () => {
    if (page > 1) {
      //2페이지부터 활성화
      onPageChange(page - 1)
    }
  }

  // ( > ) 버튼 클릭 시 다음 페이지로 넘어가게끔
  const handleNextClick = () => {
    if (page < totalPages) {
      //마지막페이지 제외하고 활성화
      onPageChange(page + 1)
    }
  }

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.arrowButton}
        onClick={handlePrevClick}
        disabled={page === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M9.5 4.66669L6 8.16669L9.5 11.6667"
            stroke="#4B5563"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* 배열을 map으로 하나씩 꺼내서 button으로 만들기
      pageNumber : visiblePages 반복할 때마다 pageNumber = 1, 2, 3 ...
      key : 페이지가 넘어갈 때 어떤 버튼이 추가되고 어떤 버튼이 삭제되는지 구분하기 위해 값을 지정
      page===pageNumber 현재 선택된 페이지일 경우에 active 스타일을 적용시켜서 버튼을 파란색으로 만들어주기
      클릭 시 onPageChange(번호)가 MarketPage에서 setPage로 전달되서 재렌더링 후 5페이지 상품 출력 */}
      {visiblePages.map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          className={`${styles.pageButton} ${
            page === pageNumber ? styles.active : ''
          }`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        className={styles.arrowButton}
        onClick={handleNextClick}
        disabled={page === totalPages}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M6 4.66656L9.5 8.16656L6 11.6666"
            stroke="#4B5563"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}

export default Pagination
