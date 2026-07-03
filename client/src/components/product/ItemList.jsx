import ItemCard from "./ItemCard"

import styles from './ItemList.module.css'

function ItemList({ itemList }) {
  return (
    <ul className={styles.itemList}>
      {itemList.map((item) => (
        <li key={item._id}>
          <ItemCard item={item}/>
        </li>
      ))}
    </ul>
  )
}

export default ItemList