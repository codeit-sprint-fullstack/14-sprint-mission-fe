import BestProducts from "./BestProducts";
import ProductControls from "./ProductControls";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import styles from "./items.module.css";

async function getProducts({ page, pageSize, orderBy, keyword }) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy,
  });
  if (keyword) params.set("keyword", keyword);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?${params.toString()}`,
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error("상품 목록 조회 실패");
  return res.json();
}

export default async function ItemsPage({ searchParams }) {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const orderBy = sp.orderBy || "recent";
  const keyword = sp.keyword || "";
  const pageSize = 10; // 기본값(Desktop 기준), 클라이언트에서 화면 크기에 맞게 재조정

  const data = await getProducts({ page, pageSize, orderBy, keyword });

  return (
    <>
      <BestProducts />

      <section className={`wrapper ${styles.productsList}`}>
        <div className={styles.productsHeader}>
          <h2 className={styles.productsTitle}>판매 중인 상품</h2>
          <ProductControls orderBy={orderBy} keyword={keyword} />
        </div>

        <ProductGrid
          initialProducts={data.list}
          page={page}
          orderBy={orderBy}
          keyword={keyword}
        />

        <Pagination
          page={page}
          totalCount={data.totalCount}
          pageSize={pageSize}
          orderBy={orderBy}
          keyword={keyword}
        />
      </section>
    </>
  );
}
