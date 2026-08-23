import FilterList from "@/app/components/FilterList";
import SearchBar from "@/app/components/SearchBar";
import styles from "./Items.module.css";
import AllProductList from "@/app/components/AllProductList";
import BestProductList from "@/app/components/BestProductList";
import Link from "next/link";
import { Suspense } from "react";

export default function Items() {
  return (
    <>
      <section className={styles.bestProductsList}>
        <h2 className={styles.sectionTitle}>베스트 상품</h2>
        <BestProductList />
      </section>
      <section className={styles.productsList}>
        <div className={styles.sectionTitleHeader}>
          <h2 className={styles.sectionTitle}>판매 중인 상품</h2>
          <Link href="/items/new" className="btStyle">
            상품 등록하기
          </Link>
          <div className={styles.productsSearch}>
            <Suspense fallback={<p>불러오는 중...</p>}>
              <SearchBar />
              <FilterList />
            </Suspense>
          </div>
        </div>
        <Suspense fallback={<p>불러오는 중...</p>}>
          <AllProductList />
        </Suspense>
      </section>
    </>
  );
}
