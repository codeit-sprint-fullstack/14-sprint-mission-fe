import heartIcon from '../assets/ic_heart.svg';
import defaultImage from '../assets/img_default.png';
import './ProductCard.css';

function ProductCard({ product }) {
  const {
    name,
    price,
    /* 다음 미션에서 API 연결 후 다시 사용
    favoriteCount,
    images, */
  } = product;
  // 이번 미션에서는 백엔드에 좋아요 기능이 없어 임시값 사용
  const DEFAULT_FAVORITE_COUNT = 240;

  return (
    <div className='product-card'>
      <div className='product-info'>
        {/* 다음 미션에서 다시 사용할 부분, 이미지 예외 처리 
        <img className='product-image' src={images?.[0]} alt={name} /> */}
        <img className='product-image' src={defaultImage} alt={name} />
        <p className='product-name'>{name}</p>
        <p className='product-price'>{price.toLocaleString()}원</p>
        <p className='product-favorite'>
          <img className='favorite-icon' src={heartIcon} alt='' />
          {DEFAULT_FAVORITE_COUNT}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;