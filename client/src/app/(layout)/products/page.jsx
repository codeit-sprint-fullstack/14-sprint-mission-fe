'use client';

import Dropdown from "@/components/Dropdown";
import SearchInput from "@/components/SearchInput";
import { useGetProducts } from "@/queries/products";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductList from "./_components/ProductList";
import styles from "./page.module.css";

export default function Products() {
  // searchParams로 url의 keyword, sort 꺼내기
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const orderBy = searchParams.get('orderBy') ?? 'recent';

  // 상품 가져오기(react query 사용)
  const { data, isPending, isError, error } = useGetProducts(
    { page: 1, pageSize: 10, orderBy, keyword }
  );

  if (isPending) return <p>로딩 중...</p>
  if (isError) return <p>{error.message}</p>

  const totalCount = data.totalCount;
  const products = data.products;

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
    </div>
  );
}
