import "./ProductCard.css";
import heartIcon from "../../assets/ic_heart.png";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-box">
        <img className="product-image" src={product.images[0]} alt={product.name} />
      </div>

      <div className="product-info">
        <p className="product-name">
          {product.name}
        </p>

        <p className="product-price">
          {product.price.toLocaleString()}원
        </p>

        <p className="product-favorite">
          <img src={heartIcon} alt="좋아요" /> {product.favoriteCount}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;