import ItemCard from "./ItemCard"
import styles from './ItemList.module.css'

function ItemList({ items }) {
  return (
    <ul className={styles.itemList}>
      {items.map((item) => (
        <li key={item.id}>
          <ItemCard item={item}/>
        </li>
      ))}
    </ul>
  )
}

export default ItemList