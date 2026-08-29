import { getBestProducts } from "@/services/ProductService";
import BestProductsGrid from "./BestProductsGrid";
import styles from "./items.module.css";

export default async function BestProducts() {
  const data = await getBestProducts(4);

  if (!data.list || data.list.length === 0) return null;

  return (
    <section className={`wrapper ${styles.bestSection}`}>
      <h2 className={styles.bestTitle}>베스트 상품</h2>
      <BestProductsGrid initialProducts={data.list} />
    </section>
  );
}