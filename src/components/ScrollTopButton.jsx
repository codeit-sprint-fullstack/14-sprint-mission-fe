import { useEffect, useState } from 'react';
import { scrollToPageTop, shouldShowScrollTopButton } from '../utils/navigation.js';

function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(shouldShowScrollTopButton());
    };

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
      onClick={() => scrollToPageTop()}
      aria-label="위로 가기"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}

export default ScrollTopButton;
