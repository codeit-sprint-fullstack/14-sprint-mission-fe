import { useState } from 'react';
import './Pagination.css';

function Pagination ({ lists, page, setPage }) {

  const totalPageList = Array(lists).fill().map((_, i) => i + 1);
  //배열을 5개씩 쪼개서 중첩배열로 만들기
  const seperatedPageList = [];
  for (let i = 0; i < totalPageList.length; i+=5 ){
    seperatedPageList.push(totalPageList.slice(i, i+5));
  }
  //현재 페이지(page)가 속하는 배열 찾기 - 배열 map으로 리스트화해주면 끝남...ㅠㅠㅠㅠㅠ [1,2,3,4,5]
  const currentList = seperatedPageList[Math.floor((page - 1) / 5)] || [] ;

  //이전, 이후 버튼 동작 
  const handlePageList = ( direction ) => {
    if ( direction === 'Prev') {
      if ( currentList[0] > 1 ){
        setPage(currentList[0] - 1);
      }
    } else if ( direction === 'Next') {
      const lastPageOfCurrentList = currentList[currentList.length - 1] ;
      if ( lastPageOfCurrentList < lists){
        setPage(lastPageOfCurrentList + 1);
    }}
  };

  return (
    <ul className="pagination">
      <li><button onClick={() => handlePageList('Prev')}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M9.5 4.66669L6 8.16669L9.5 11.6667" stroke="#4B5563" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button></li>
      {currentList.map((p) => (
        <li
          key={p}
          className={p === page ? 'active' : ''}
        >
          <button onClick={() => setPage(p)}>
          {p}
        </button>
        </li>
      ))}
      <li><button onClick={() => handlePageList('Next')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4.66656L9.5 8.16656L6 11.6666" stroke="#4B5563" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button></li>
    </ul>
  )
}

export default Pagination;