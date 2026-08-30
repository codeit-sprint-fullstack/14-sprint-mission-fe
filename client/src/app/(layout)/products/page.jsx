'use client';

import Dropdown from "@/components/Dropdown";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import { useGetProducts } from "@/queries/products";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductList from "./_components/ProductList";
import styles from "./page.module.css";

export default function Products() {
  const pageSize = 10;
  // searchParams로 url의 page, keyword, sort 꺼내기
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);
  const keyword = searchParams.get('keyword') ?? '';
  const orderBy = searchParams.get('orderBy') ?? 'recent';

  // 상품 가져오기(react query 사용)
  const { data, isPending, isError, error } = useGetProducts(
    { page, pageSize, orderBy, keyword }
  );

  if (isPending) return <p>로딩 중...</p>
  if (isError) return <p>{error.message}</p>

  const products = data.products;
  const totalCount = data.totalCount;

  // 페이지네이션
  const totalPages = Math.ceil(totalCount / pageSize) // 필요한 총 페이지 수 구하기
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1); // 페이지 배열 만들기 (1, 2... N)

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>판매 중인 상품</h1>
        <div className={styles.headerRight}>
          <SearchInput
            placeholder="검색할 상품을 입력해주세요"
            route="/products"
            variant="product"
          />
          <Link className={styles.link} href="/registration">
            상품 등록하기
          </Link>
          <Dropdown route="/products" />
        </div>
      </header>
      <ProductList products={products} />
      <section className={styles.pagination}>
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          pageNumbers={pageNumbers}
          route={'products'}
        />
      </section>
    </div>
  );
}
