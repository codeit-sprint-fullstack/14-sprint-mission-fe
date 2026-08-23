import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/productsApi";
import BestProductList from "@/components/items/BestProductList";
import ProductCard from "@/components/items/ProductCard";
import styles from "./Items.module.css";

export default function ItemsPage() {
  const [searchText, setSearchText] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "products",
      currentPage,
      pageSize,
      orderBy,
      searchText,
    ],
    queryFn: () =>
      getProducts({
        page: currentPage,
        pageSize,
        orderBy,
        keyword: searchText,
      }),
  });

  const products = data?.list || [];
  const totalCount = data?.totalCount || 0;

  const totalPages = Math.ceil(totalCount / pageSize);
  const pageGroupSize = 5;

  const startPage =
    Math.floor((currentPage - 1) / pageGroupSize) *
      pageGroupSize +
    1;

  const endPage = Math.min(
    startPage + pageGroupSize - 1,
    totalPages,
  );

  const pageNumbers = Array.from(
    { length: Math.max(endPage - startPage + 1, 0) },
    (_, index) => startPage + index,
  );

  function handleSearchChange(event) {
    setSearchText(event.target.value);
    setCurrentPage(1);
  }

  function handleOrderChange(event) {
    setOrderBy(event.target.value);
    setCurrentPage(1);
  }

  function handlePreviousPageGroup() {
    setCurrentPage(
      Math.max(startPage - pageGroupSize, 1),
    );
  }

  function handleNextPageGroup() {
    setCurrentPage(endPage + 1);
  }

  return (
    <main className={styles.itemsPage}>
      <BestProductList />

      <section className={styles.productSection}>
        <div className={styles.listHeader}>
          <h1 className={styles.listTitle}>판매 중인 상품</h1>

          <div className={styles.controls}>
            <div className={styles.searchBox}>
              <img
                className={styles.searchIcon}
                src="/images/search.png"
                alt="검색"
              />

              <input
                className={styles.searchInput}
                value={searchText}
                onChange={handleSearchChange}
                placeholder="검색할 상품을 입력해주세요"
              />
            </div>

            <Link
              className={styles.registerButton}
              href="/items/new"
            >
              상품 등록하기
            </Link>

            <select
              className={styles.orderSelect}
              value={orderBy}
              onChange={handleOrderChange}
            >
              <option value="recent">최신순</option>
              <option value="favorite">좋아요순</option>
            </select>
          </div>
        </div>

        {isLoading && (
          <p className={styles.message}>
            상품을 불러오는 중입니다.
          </p>
        )}

        {isError && (
          <p className={styles.message}>
            상품 목록을 불러오지 못했습니다.
          </p>
        )}

        {!isLoading && !isError && (
          <>
            <div className={styles.productGrid}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            {totalPages > 0 && (
              <div className={styles.pagination}>
                <button
                  className={styles.pageButton}
                  type="button"
                  onClick={handlePreviousPageGroup}
                  disabled={startPage === 1}
                >
                  &lt;
                </button>

                {pageNumbers.map((pageNumber) => (
                  <button
                    className={
                      currentPage === pageNumber
                        ? styles.activePageButton
                        : styles.pageButton
                    }
                    type="button"
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  className={styles.pageButton}
                  type="button"
                  onClick={handleNextPageGroup}
                  disabled={endPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
