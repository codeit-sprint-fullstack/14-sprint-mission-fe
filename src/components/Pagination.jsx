import { useEffect, useState } from "react";


function PageButton({ page, pageNumber, onPageChange }) {
    return (
        <li>
            <button type="button" className={page === pageNumber ? "btnPage thisPage" : "btnPage"} onClick={(e) => {
                onPageChange(pageNumber);
                console.log(e.target)
            }}>
                <span className="text">{pageNumber}</span>
            </button>
        </li>
    )    
}


function Pagination({ page, totalPage, onPageChange }) {
    // 5개의 페이지 버튼을 보여줄 것
    const pageButtonSize = 5;
    
    const currentGroup = Math.ceil(page / pageButtonSize);
    const startPage = (currentGroup - 1) * pageButtonSize + 1;
    const endPage = Math.min(startPage + pageButtonSize - 1, totalPage);

    const pageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }
    
    return (
        <ul className='pagination flex'>
            <li>
                <button type="button" className="btnPage prev" onClick={() => {
                    onPageChange(page - 1);
                }} disabled={page === 1}>
                    <span className="noText">이전 페이지로</span>
                </button>
            </li>
            {pageNumbers.map((pageNumber) => (
                <PageButton key={pageNumber} page={page} pageNumber={pageNumber} onPageChange={onPageChange}></PageButton>
            ))}
            <li>
                <button type="button" className="btnPage next" onClick={() => {
                    console.log('sdfsdfsdfsdf');
                    onPageChange(page + 1);
                }} disabled={page === totalPage}>
                    <span className="noText">다음 페이지로</span>
                </button>
            </li>

        </ul>
    )



}
export default Pagination;