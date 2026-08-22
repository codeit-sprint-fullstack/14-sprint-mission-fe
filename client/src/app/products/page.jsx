import Dropdown from "@/components/Dropdown";
import SearchInput from "@/components/SearchInput";
import Link from "next/link";
import ProductList from "./_components/ProductList";
import styles from "./page.module.css";

export default async function Products({ searchParams }) {
  // searchParams로 url의 keyword, sort 꺼내기
  const params = await searchParams;
  const keyword = params.keyword ?? "";
  const sort = params.sort ?? "recent";

  // 상품 가져오기
  const res = await fetch(
    `${process.env.API_BASE_URL}/products?keyword=${keyword}&sort=${sort}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("상품을 불러오는 데 실패했습니다");
  }
  const data = await res.json();
  const products = data.list;

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
