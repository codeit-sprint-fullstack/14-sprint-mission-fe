import { useState } from "react";

import Link from "next/link";

import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";
import useSaleProducts from "@/hooks/useSaleProducts";
import styles from "@/styles/Items.module.css";

const PAGE_SIZE = 10;
const MAX_PAGE_BUTTONS = 5;

export default function Items() {
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  // 베스트 상품 조회
  const {
    saleProducts: bestProducts,
    isSaleLoading: isBestLoading,
    saleError: bestError,
  } = useSaleProducts({
    page: 1,
    pageSize: 4,
    orderBy: "favorite",
    keyword: "",
  });

  // 판매 중인 상품 목록 조회
  const {
    saleProducts,
    totalCount,
    isSaleLoading,
    saleError,
  } = useSaleProducts({
    page,
    pageSize: PAGE_SIZE,
    orderBy,
    keyword,
  });

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // 현재 페이지 그룹의 첫 페이지 계산
  const startPage =
    Math.floor((page - 1) / MAX_PAGE_BUTTONS) *
    MAX_PAGE_BUTTONS +
    1;

  const endPage = Math.min(
    startPage + MAX_PAGE_BUTTONS - 1,
    totalPages,
  );

  const pageNumbers =
    totalPages > 0
      ? Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index,
      )
      : [];

  // 검색어 변경
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
    setPage(1);
  };

  return (
    <>
      <main className={styles.fleaMarket}>
        <div className={styles.fleaMarketContainer}>
          <section className={styles.productSection}>
            <h2 className={styles.productSectionTitle}>
              베스트 상품
            </h2>

            {isBestLoading && (
              <p className={styles.productStatusMessage}>
                상품을 불러오는 중입니다.
              </p>
            )}

            {bestError && (
              <p
                className={`${styles.productStatusMessage} ${styles.productErrorMessage}`}
              >
                {bestError}
              </p>
            )}

            {!isBestLoading && !bestError && (
              <div className={styles.bestProductList}>
                <ProductList products={bestProducts} />
              </div>
            )}
          </section>
          <section className={styles.productSection}>
            <div className={styles.productSectionHeading}>
              <h1 className={styles.productSectionTitle}>
                판매 중인 상품
              </h1>

              <Link
                href="/registration"
                className={styles.productRegisterButton}
              >
                상품 등록하기
              </Link>
            </div>

            <div className={styles.productToolbar}>
              <input
                type="text"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="검색할 상품을 입력해주세요"
                className={styles.productSearchInput}
              />

              <select
                value={orderBy}
                onChange={(event) => {
                  setOrderBy(event.target.value);
                  setPage(1);
                }}
                className={styles.productSortSelect}
              >
                <option value="recent">최신순</option>
                <option value="favorite">좋아요순</option>
              </select>
            </div>

            {isSaleLoading && (
              <p className={styles.productStatusMessage}>
                상품을 불러오는 중입니다.
              </p>
            )}

            {saleError && (
              <p
                className={`${styles.productStatusMessage} ${styles.productErrorMessage}`}
              >
                {saleError}
              </p>
            )}

            {!isSaleLoading && !saleError && (
              <div className={styles.allProductList}>
                <ProductList products={saleProducts} />
              </div>
            )}

            {totalPages > 1 && (
              <div className={styles.productPagination}>
                <button
                  type="button"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className={styles.productPageArrow}
                  aria-label="이전 페이지"
                >
                  ‹
                </button>

                {pageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`${styles.productPageNumber} ${page === pageNumber
                      ? styles.productPageNumberActive
                      : ""
                      }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className={styles.productPageArrow}
                  aria-label="다음 페이지"
                >
                  ›
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}