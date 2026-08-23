import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";

import Pagination from "@/components/items/Pagination";
import ProductCard from "@/components/items/ProductCard";
import useResponsivePageSize from "@/hooks/useResponsivePageSize";
import { getProduct, getProducts } from "@/lib/api/products";
import { hasAccessToken } from "@/lib/auth";
import { queryKeys } from "@/lib/queryKeys";
import styles from "@/styles/ItemsPage.module.css";

export default function ItemsPage() {
  const queryClient = useQueryClient();
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const resetPage = useCallback(() => setPage(1), []);
  const pageSize = useResponsivePageSize(resetPage);

  const queryParams = { page, pageSize, orderBy, keyword };
  const {
    data,
    isPending,
    isError,
    error,
    isPlaceholderData,
    isFetching,
  } = useQuery({
    queryKey: queryKeys.products.list(queryParams),
    queryFn: () => getProducts(queryParams),
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  });

  const products = data?.list ?? [];
  const totalPages = Math.max(1, Math.ceil((data?.totalCount ?? 0) / pageSize));

  useEffect(() => {
    if (!data || isPlaceholderData || page >= totalPages) return;

    const nextPageParams = {
      page: page + 1,
      pageSize,
      orderBy,
      keyword,
    };

    queryClient.prefetchQuery({
      queryKey: queryKeys.products.list(nextPageParams),
      queryFn: () => getProducts(nextPageParams),
      staleTime: 30 * 1000,
    });
  }, [data, isPlaceholderData, keyword, orderBy, page, pageSize, queryClient, totalPages]);

  function prefetchProductDetail(productId) {
    if (!hasAccessToken()) return;

    queryClient.prefetchQuery({
      queryKey: queryKeys.products.detail(productId),
      queryFn: () => getProduct(productId),
      staleTime: 30 * 1000,
    });
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
    setPage(1);
  }

  function handleOrderChange(nextOrder) {
    setOrderBy(nextOrder);
    setPage(1);
  }

  function handlePageChange(nextPage) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Head>
        <title>중고마켓 | 판다마켓</title>
      </Head>

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.productHeader}>
            <h1 className={styles.title}>
              판매 중인 상품
              {isFetching && !isPending && <span className={styles.refreshing}>갱신 중</span>}
            </h1>

            <div className={styles.controls}>
              <div className={styles.searchBox}>
                <svg className={styles.searchIcon} viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m16.2 16.2 4 4" />
                </svg>
                <input
                  value={keyword}
                  onChange={handleKeywordChange}
                  placeholder="검색할 상품을 입력해주세요"
                  className={styles.searchInput}
                  aria-label="상품 검색"
                />
              </div>

              <Link className={styles.registerButton} href="/items/new">
                상품 등록하기
              </Link>

              <select
                className={styles.sortSelect}
                value={orderBy}
                onChange={(event) => handleOrderChange(event.target.value)}
                aria-label="상품 정렬"
              >
                <option value="recent">최신순</option>
                <option value="favorite">좋아요순</option>
              </select>

              <button
                className={styles.mobileSortButton}
                type="button"
                onClick={() => handleOrderChange(orderBy === "recent" ? "favorite" : "recent")}
                aria-label={orderBy === "recent" ? "좋아요순으로 정렬" : "최신순으로 정렬"}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 6.5v11M18.5 14 15 17.5 11.5 14M7.9 15.5h1.6M5 7.5h5M6.3 11.5h3.2" />
                </svg>
              </button>
            </div>
          </div>

          {isPending ? (
            <div className={styles.state} role="status">
              <span className={styles.spinner} />
              상품을 불러오는 중입니다...
            </div>
          ) : isError ? (
            <div className={styles.state} role="alert">
              <strong>상품을 불러오지 못했습니다.</strong>
              <span>{error?.response?.data?.message || "잠시 후 다시 시도해 주세요."}</span>
            </div>
          ) : products.length === 0 ? (
            <div className={styles.state}>검색 결과가 없습니다.</div>
          ) : (
            <>
              <div className={`${styles.productGrid} ${isPlaceholderData ? styles.transitioning : ""}`}>
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onPrefetch={prefetchProductDetail}
                  />
                ))}
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </section>
      </main>
    </>
  );
}
