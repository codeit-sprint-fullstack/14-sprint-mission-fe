import { useEffect, useState } from "react";

function getPageSize() {
  if (typeof window === "undefined") {
    return 10;
  }

  if (window.innerWidth < 744) return 4;
  if (window.innerWidth < 1200) return 6;
  return 10;
}

export default function useResponsivePageSize(onPageSizeChange) {
  const [pageSize, setPageSize] = useState(getPageSize);

  useEffect(() => {
    let previousPageSize = getPageSize();

    function handleResize() {
      const nextPageSize = getPageSize();
      if (nextPageSize === previousPageSize) return;

      previousPageSize = nextPageSize;
      setPageSize(nextPageSize);
      onPageSizeChange?.(nextPageSize);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onPageSizeChange]);

  return pageSize;
}
