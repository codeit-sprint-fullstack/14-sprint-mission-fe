import defaultImage from '../../../assets/images/default.png'
import './ProductCard.css'

const ProductCard = ({ product }) => {
  return (
    <article className="product-card">
      <img
        className="product-card__image"
        src={defaultImage}
        alt={product.name}
      />

      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__price">{product.price.toLocaleString()}원</p>
    </article>
  )
}

export default ProductCard
