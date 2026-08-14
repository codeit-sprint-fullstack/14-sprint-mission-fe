const heartIcon = "/images/ic_heart.png";

function ItemCard({ type, images, name, price, favoriteCount }) {
  return (
    <div className={`ItemCard ${type}`}>
      <div>{name}</div>
      <div>{price?.toLocaleString()}원</div>
      <div className="heart-count">
        <img src={heartIcon} alt="heart" />
        <span>{favoriteCount}</span>
      </div>
    </div>
  );
}

export default ItemCard;
