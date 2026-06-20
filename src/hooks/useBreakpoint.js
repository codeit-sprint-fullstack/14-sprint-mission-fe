import { useEffect, useState } from 'react';

function getBreakpoint() {
  if (window.innerWidth >= 1200) {
    return 'desktop';
  }

  if (window.innerWidth >= 744) {
    return 'tablet';
  }

  return 'mobile';
}

function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(() => getBreakpoint());

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint((current) => {
        const next = getBreakpoint();
        return current === next ? current : next;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}

export default useBreakpoint;
