'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from './Pagination.module.css';

export default function Pagination({ totalPages, currentPage, pageNumbers, route }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 한 번에 표시할 페이지 번호 개수
  const pageGroupSize = 5;
  // 현재 페이지가 포함된 그룹
  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  // 현재 그룹의 시작 및 마지막 페이지 (인덱스 번호 - slice에 활용)
  const startIndex = currentGroup * pageGroupSize;
  const endIndex = startIndex + pageGroupSize;
  // 화면에 표시한 페이지 번호 배열
  const visiblePageNumbers = pageNumbers.slice(startIndex, endIndex);

  function handlePageChange(nextPage) {
    if (nextPage < 1 || nextPage > totalPages) {
      return;
    }
    // 기존 쿼리 유지하면서 page만 변경
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(nextPage));
    router.push(`/${route}?${params.toString()}`);
  }

  return (
    <nav className={styles.wrapper}>
      <button 
        className={`${styles.button} ${styles.arrow}`}
        type='button'
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        &lt;
      </button>

      {visiblePageNumbers.map((pageNumber) => (
        <button 
          className={
            `${styles.button} ${styles.number}
             ${currentPage === pageNumber ? styles.active : ''}`
          }
          type='button'
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className={`${styles.button} ${styles.arrow}`}
        type='button'
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </nav>
  )
}
