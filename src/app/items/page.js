import BestProducts from "@/components/items/BestProducts/BestProducts";
import ProductList from "@/components/items/ProductList/ProductList";
import styles from "./page.module.css";

export default async function ItemsPage({ searchParams }) {
  const { keyword = "", sort = "recent" } = await searchParams;

  return (
    <div className={styles.page}>
      <BestProducts />
      <ProductList
        key={keyword}
        initialKeyword={keyword}
        initialOrderBy={sort}
      />
    </div>
  );
}
