import Link from "next/link";

const heartIcon = "/images/ic_heart.png";
const API_BASE_URL = "http://localhost:3001";

function ItemCard({ id, type, images, name, price, favoriteCount }) {
  const imagePath = images?.[0];
  const imageUrl = imagePath ? `${API_BASE_URL}${imagePath}` : null;

  return (
    <Link href={`/items/${id}`}>
      <div className={`ItemCard ${type}`}>
        {imageUrl ? (
          <img src={imageUrl} alt="상품 이미지" width="220" height="220" />
        ) : (
          <div>이미지 없음</div>
        )}

        <div>{name}</div>
        <div>{price?.toLocaleString()}원</div>

        <div className="heart-count">
          <img src={heartIcon} alt="좋아요" />
          <span>{favoriteCount}</span>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
