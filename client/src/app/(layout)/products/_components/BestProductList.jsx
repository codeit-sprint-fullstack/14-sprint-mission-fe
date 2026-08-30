import Link from 'next/link.js';
import BestProductCard from './BestProductCard.jsx';
import styles from './BestProductList.module.css';

export default function BestProductList({ products = [] }) {
  if (products.length === 0) {
    return <p>상품이 없습니다</p>;
  }

  return (
    <ul className={styles.productList}>
      {products.map((product) => (
        <li key={product.id}>
          <Link className={styles.productCard} href={`products/${product.id}`}>
            <BestProductCard product={product}/>
          </Link>
        </li>
      ))}
    </ul>
  )
}