'use client';

import { useState } from 'react';
import { useRouter,  useSearchParams } from 'next/navigation';

export default function Dropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get('sort') ?? 'recent';
  const [isOpen, setIsOpen] = useState(false);

  function handleSort(sort) {
    // 기존 검색 조건을 유지하면서 정렬 조건만 변경
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort)
    router.push(`/articles?${params.toString()}`);
    
    // 드롭다운 닫기
    setIsOpen(false)
  }

  return (
    <div>
      <button type='button' onClick={() => setIsOpen(!isOpen)}>
        {currentSort === 'recent' ? '최신순' : '좋아요순'}
      </button>

      {isOpen && 
        <ul>
          <li>
            <button type='button' onClick={() => handleSort('recent')}>
              최신순
            </button>
          </li>
          <li>
            <button type='button' disabled>
              좋아요순
            </button>
          </li>
        </ul>
      }
    </div>
  )
}