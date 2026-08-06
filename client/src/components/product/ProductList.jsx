import Link from 'next/link';
import ProductCard from './ProductCard';
import styles from './ProductList.module.css';

export default function ProductList({ products = [] }) {
  return (
    <ul className={styles.productList}>
      {products.map((product) => (
        <Link href={`products/${product.id}`}>
          <li key={product.id}>
            <ProductCard product={product}/>
          </li>
        </Link>
      ))}
    </ul>
  )
}