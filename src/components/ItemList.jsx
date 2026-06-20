import ItemCard from "./ItemCard"

function ItemList({ items }) {
  return (
    <section>
      <h2>판매 중인 상품</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <ItemCard item={item}/>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ItemList