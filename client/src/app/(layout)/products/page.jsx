'use client';

import Dropdown from "@/components/Dropdown";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import { useGetProducts } from "@/queries/products";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductList from "./_components/ProductList";
import styles from "./page.module.css";
import BestProductList from "./_components/BestProductList";

export default function Products() {
  const pageSize = 10;
  // searchParams로 url의 page, keyword, sort 꺼내기
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);
  const keyword = searchParams.get('keyword') ?? '';
  const orderBy = searchParams.get('orderBy') ?? 'recent';
  // 베스크 상품 가져오기
  const {
    data: bestData,
    isPending: isBestPending,
    isError: isBestError,
    error: bestError,
  } = useGetProducts(
    { page: 1,
      pageSize: 4,
      orderBy: 'favorite',
      keyword: '',
    }
  )
  // 상품 가져오기(react query 사용)
  const { 
    data, 
    isPending, 
    isError, 
    error 
  } = useGetProducts(
    { page, pageSize, orderBy, keyword }
  );

  if (isPending || isBestPending) return <p>로딩 중...</p>;
  if (isError || isBestError) return <p> 게시글을 불러오지 못했습니다: {error?.message ?? bestError?.message}</p>;
  
  const bestProducts = bestData.products;
  const products = data.products;
  const totalCount = data.totalCount;

  // 페이지네이션
  const totalPages = Math.ceil(totalCount / pageSize) // 필요한 총 페이지 수 구하기
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1); // 페이지 배열 만들기 (1, 2... N)

  return (
    <div className={styles.wrapper}>
      <section>
        <h1 className={styles.bestTitle}>
          베스트 상품
        </h1>
        <BestProductList products={bestProducts} />
      </section>

      <section>
        <div className={styles.header}>
          <h2 className={styles.title}>판매 중인 상품</h2>
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
        </div>
        <ProductList products={products} />
      </section>

      <div className={styles.pagination}>
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          pageNumbers={pageNumbers}
          route={'products'}
        />
      </div>
    </div>
  );
}
