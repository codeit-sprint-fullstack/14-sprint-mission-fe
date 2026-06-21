import { useState } from "react";

function PageNum({ totalPages, setPage }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const [pageGroup, setPageGroup] = useState(0);
  const start = pageGroup * 5;
  const end = start + 5;
  const lastGroup = Math.ceil(totalPages / 5) - 1;
  const visiblePage = pages.slice(start, end);

  return (
    <div>
      <button
        onClick={() => {
          if (pageGroup === 0) return;
          setPageGroup(pageGroup - 1);
        }}
      >
        이전
      </button>
      {visiblePage.map((page) => (
        <button
          onClick={() => {
            setPage(page);
          }}
          key={page}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => {
          if (pageGroup === lastGroup) return null;
          setPageGroup(pageGroup + 1);
        }}
      >
        다음
      </button>
    </div>
  );
}

export default PageNum;
