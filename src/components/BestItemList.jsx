import styles from './BestItemList.module.css'
import ItemCard from './ItemCard.jsx'

function BestItemList({ bestItems }) {
  return (
    <section>
      <h2>베스트 상품</h2>
      <ul className={styles.list}>
        {bestItems.map((bestItem) => (
          <li key={bestItem.id}>
            <ItemCard item={bestItem}/>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BestItemList