"use client";

import Button from "@/components/Button/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import Pagination from "@/components/Pagination/Pagination";
import SearchInput from "@/components/SearchInput/SearchInput";
import useResponsiveValue from "@/hooks/useResponsiveValue";
import { getProducts } from "@/lib/productApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductList.module.css";

const SORT_OPTIONS = [
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "favorite" },
];

export default function ProductList({
  initialKeyword = "",
  initialOrderBy = "recent",
}) {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: null,
  });

  const [searchInput, setSearchInput] = useState(initialKeyword);

  const router = useRouter();
  const searchParams = useSearchParams();

  const pageSize = useResponsiveValue({
    mobile: 4,
    tablet: 6,
    desktop: 10,
  });

  const page = pagination.pageSize === pageSize ? pagination.page : 1;

  const { data, isPending, isError } = useQuery({
    queryKey: [
      "products",
      "list",
      {
        page,
        pageSize,
        keyword: initialKeyword,
        orderBy: initialOrderBy,
      },
    ],
    queryFn: () =>
      getProducts({
        page,
        pageSize,
        keyword: initialKeyword,
        orderBy: initialOrderBy,
      }),
    enabled: pageSize !== null,
    placeholderData: keepPreviousData,
  });

  function handleSearch(event) {
    event.preventDefault();

    const trimmedKeyword = searchInput.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (trimmedKeyword) {
      params.set("keyword", trimmedKeyword);
    } else {
      params.delete("keyword");
    }

    setPagination({
      page: 1,
      pageSize,
    });

    router.push(`/items?${params.toString()}`);
  }

  function handleSortChange(value) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "recent") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    setPagination({
      page: 1,
      pageSize,
    });

    router.push(`/items?${params.toString()}`);
  }

  function handlePageChange(nextPage) {
    setPagination({
      page: nextPage,
      pageSize,
    });
  }

  const products = data?.list ?? [];
  const totalCount = data?.totalCount ?? 0;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>판매 중인 상품</h2>

        <form className={styles.searchForm} onSubmit={handleSearch}>
          <SearchInput
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="검색할 상품을 입력해 주세요."
          />
        </form>

        <Button href="/items/new" className={styles.addButton}>
          상품 등록하기
        </Button>

        <div className={styles.sort}>
          <Dropdown
            options={SORT_OPTIONS}
            value={initialOrderBy}
            onChange={handleSortChange}
          />
        </div>
      </div>

      {isPending ? (
        <p className={styles.status}>상품을 불러오는 중입니다...</p>
      ) : isError ? (
        <p className={styles.status}>상품을 불러오지 못했습니다.</p>
      ) : products.length === 0 ? (
        <p className={styles.status}>상품이 없습니다.</p>
      ) : (
        <div className={styles.list}>
          {products.map((product) => (
            <div key={product.id} className={styles.item}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {pageSize !== null && !isPending && !isError && (
        <Pagination
          page={page}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}
