import ItemCard from './ItemCard.jsx'
import styles from './BestItemList.module.css'

function BestItemList({ bestItems }) {
  return (
    <ul className={styles.itemList}>
      {bestItems.map((bestItem) => (
        <li key={bestItem.id}>
          <ItemCard item={bestItem}/>
        </li>
      ))}
    </ul>
  )
}

export default BestItemList