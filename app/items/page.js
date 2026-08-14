"use client";

import { useState } from "react";
import Link from "next/link";
import ItemCard from "./_components/ItemCard";

const PAGE_SIZE = 10;

export default function ItemsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);

  // 다음 단계에서 React Query가 반환한 값으로 교체합니다.
  const items = [];
  const totalCount = 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  function handleSearch(event) {
    event.preventDefault();
    setKeyword(searchInput.trim());
    setPage(1);
  }

  function handleOrderChange(nextOrderBy) {
    setOrderBy(nextOrderBy);
    setPage(1);
    setIsOpen(false);
  }

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <main>
      <section className="selling-line">
        <h1 className="title">판매중인 상품</h1>

        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="검색할 상품을 입력해주세요"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <button type="submit">검색</button>
        </form>

        <Link href="/registration" className="register-button">
          상품 등록하기
        </Link>

        <div className="dropdown">
          <button
            type="button"
            className="dropdown-button"
            onClick={() => setIsOpen((previous) => !previous)}
          >
            {orderBy === "recent" ? "최신순" : "좋아요순"}▼
          </button>

          {isOpen && (
            <div className="dropdown-menu">
              <button type="button" onClick={() => handleOrderChange("recent")}>
                최신순
              </button>

              <button
                type="button"
                onClick={() => handleOrderChange("favorite")}
              >
                좋아요순
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="general-items">
        {items.map((item) => (
          <ItemCard
            type="general"
            key={item.id}
            images={item.images}
            name={item.name}
            price={item.price}
            favoriteCount={item.favoriteCount}
          />
        ))}

        {items.length === 0 && keyword && <p>검색 결과가 없습니다.</p>}
      </section>

      <nav className="pagination">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage((previous) => Math.max(1, previous - 1))}
        >
          {"<"}
        </button>

        {pageNumbers.map((pageNumber) => (
          <button
            type="button"
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          disabled={page === totalPages}
          onClick={() =>
            setPage((previous) => Math.min(totalPages, previous + 1))
          }
        >
          {">"}
        </button>
      </nav>
    </main>
  );
}
