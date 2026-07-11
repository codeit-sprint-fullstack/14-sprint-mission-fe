import { Link } from 'react-router-dom'

import heartIcon from '../../assets/ic_heart.png'
import defaultImg from '../../assets/img_default.svg'

import styles from './ItemCard.module.css'

function ItemCard({ item }) {
  return (
    <Link className={styles.card} to={`/items/${item.id}`}>
      <article>
        <img className={styles.image} src={defaultImg} alt="상품 이미지" />
        <div className={styles.itemDesc}>
          <h3 className={styles.name}>{item.name}</h3>
          <p className={styles.price}>{item.price}원</p>
          <div className={styles.itemFav}>
            <img className={styles.heartIcon} src={heartIcon} alt="" />
            <p className={styles.favCount}>{item.favoriteCount ?? 0}</p>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default ItemCard