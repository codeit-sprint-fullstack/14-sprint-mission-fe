'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * 수정하기 / 삭제하기 메뉴를 여는 케밥 버튼(⋮).
 */
function KebabMenu({ onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // 메뉴 바깥을 누르면 닫는다
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const runAndClose = (action) => {
    setIsOpen(false);
    action();
  };

  return (
    <div className="kebab" ref={containerRef}>
      <button
        className="kebabBtn"
        aria-label="더보기"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        ⋮
      </button>

      {isOpen && (
        <ul className="kebabMenu">
          <li onClick={() => runAndClose(onEdit)}>수정하기</li>
          <li onClick={() => runAndClose(onDelete)}>삭제하기</li>
        </ul>
      )}
    </div>
  );
}

export default KebabMenu;
