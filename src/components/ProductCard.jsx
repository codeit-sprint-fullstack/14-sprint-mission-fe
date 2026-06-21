import heartIcon from '../assets/ic_heart.svg';
import './ProductCard.css';

function ProductCard({ product }) {
  const {
    name,
    price,
    favoriteCount,
    images,
  } = product;

  return (
    <div className='product-card'>
      <div className='product-info'>
        {/* 이미지 예외 처리 */}
        <img className='product-image' src={images?.[0]} alt={name} />
        <p className='product-name'>{name}</p>
        <p className='product-price'>{price.toLocaleString()}원</p>
        <p className='product-favorite'>
          <img className='favorite-icon' src={heartIcon} alt='' />
          {favoriteCount}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;