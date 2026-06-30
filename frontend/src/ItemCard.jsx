import heartIcon from './assets/ic_heart.svg'
import itemIcon from './assets/img_default.svg'

function ItemCard ({ type, images, name, price, favoriteCount }) {
  return (
    <div className={`ItemCard ${type}`}>
      <img src={images?.[0] || itemIcon } alt={name}></img>
      <div>{name}</div>
      <div>{price?.toLocaleString()}원</div>
      <div className="heart-count">
        <img src={heartIcon} alt="heart" />
        <span>{favoriteCount}</span>
      </div>
    </div >
  )
}

export default ItemCard