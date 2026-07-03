import heartIcon from '../assets/ic_heart.png'
import styles from './ItemCard.module.css'

function ItemCard({ item }) {
  return (
    <article>
      <img className={styles.image} src={item.images[0]} alt="" />
      <div className={styles.info}>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.price}>{item.price}원</p>
        <p className={styles.favCount}>
          <img src={heartIcon} alt="" />
          {item.favoriteCount}
        </p>
      </div>
    </article>
  )
}

export default ItemCard