function ItemCard({ item }) {
  return (
    <div>
      <article>
        <img src={item.images[0]} alt="" />
        <h3>{item.name}</h3>
        <p>{item.price}</p>
        <p>{item.favoriteCount}</p>
      </article>
    </div>
  )
}

export default ItemCard