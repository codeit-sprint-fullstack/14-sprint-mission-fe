import arrowLeftImg from '../assets/img/arrow_left.svg';
import arrowRightImg from '../assets/img/arrow_right.svg';
import PaginationBtn from './PaginationBtn';

function Pagination({ page, totalCount, pageSize, onPageChange }) {
    const totalPages = Math.ceil(totalCount / pageSize);

    if (totalPages <= 1) return null;

    let startPage = Math.max(1, page - 2);
    let endPage = startPage + 4;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - 4);
    }

    const pageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination_wrap">
            <button
                type="button"
                className="pagination_btn"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
            >
                <img src={arrowLeftImg} alt="이전 페이지 보기" />
            </button>

            {pageNumbers.map((number) => (
                <PaginationBtn
                    key={number}
                    number={number}
                    isActive={page === number}
                    onClick={() => onPageChange(number)}
                />
            ))}

            <button
                type="button"
                className="pagination_btn"
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                <img src={arrowRightImg} alt="다음 페이지 보기" />
            </button>
        </div>
    );
}

export default Pagination;