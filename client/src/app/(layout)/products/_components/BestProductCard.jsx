import heartIcon from '@/assets/ic_heart.png';
import defaultImg from '@/assets/img_default.svg';
import Image from 'next/image';
import styles from './ProductCard.module.css';

export default function BestProductCard({ product }) {
  return (
    <div>
      <Image 
        src={product.images[0] || defaultImg} 
        width={282} 
        height={282} 
        loading='eager'
        alt={product.name} 
      />
      <div className={styles.info}>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.price}>{product.price.toLocaleString()}원</p>
        <div className={styles.heart}>
          <Image src={heartIcon} width={16} height={16} alt="좋아요 수" />
          <p className={styles.heartCount}>{product.favoriteCount || 0}</p>
        </div>
      </div>
    </div>
  )
}