import './ProductCard.css'
import heartImg from '../assets/heartImg.svg'
import { useState } from 'react';

function ProductCard ({product}) {
    console.log(product);
    const imageUrl = product.images?.[0];
    const [imageError, setImageError] = useState(false);
return(
<>


    <div className='product-card'>
    {imageUrl && !imageError
        ? <img
    className="product-image"
    src={imageUrl}
    alt={product.name}
    onError = {() => setImageError(true)}
    /> : 
    <div className = 'no-image'></div>}
    
    <div className='explain-zone'>
    <p className='product-name'>{product.name}</p>

    <p className='product-price'>{product.price}원</p>

    <p className='favorite-count'><img className='heart-icon' src={heartImg} alt="하트 이미지" /> {product.favoriteCount}</p>
    </div>
    </div>
</>

);
}

export default ProductCard