'use client';

import { useEffect, useState } from 'react';

const SCROLL_TOP_THRESHOLD = 150;

export default function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > SCROLL_TOP_THRESHOLD);

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  return (
    <button
      className={`scroll-top-button ${isVisible ? 'is-visible' : ''}`}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="위로 가기"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
