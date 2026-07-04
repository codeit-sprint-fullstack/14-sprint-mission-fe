import heartIcon from '../../assets/ic_heart.png'
import defaultImg from '../../assets/img_default.svg'

import styles from './ItemCard.module.css'

function ItemCard({ item }) {
  return (
    <article>
      <img className={styles.image} src={defaultImg} alt="상품 이미지" />
      <div className={styles.itemDesc}>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.price}>{item.price}원</p>
        <div className={styles.itemFav}>
          <img className={styles.heartIcon} src={heartIcon} alt="" />
          <p className={styles.favCount}>240</p>
        </div>
      </div>
    </article>
  )
}

export default ItemCard