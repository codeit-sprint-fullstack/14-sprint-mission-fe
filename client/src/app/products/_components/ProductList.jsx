import Link from "next/link";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";

export default function ProductList({ products = [] }) {
  return (
    <ul className={styles.productList}>
      {products.map((product) => (
        <li key={product.id}>
          <Link className={styles.productCard} href={`products/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
