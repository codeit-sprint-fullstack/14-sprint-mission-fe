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

  if (!isVisible) {
    return null;
  }

  return (
    <button
      className="scroll-top-button"
      type="button"
      onClick={() => scrollToPageTop()}
      aria-label="위로 가기"
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}

export default ScrollTopButton;
