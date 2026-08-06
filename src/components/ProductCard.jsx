function ProductCard({ product }) {
  return (
    <div className="itemCard">
      <img src={product.images?.[0] ?? '/img/default_items_img.png'} alt={product.name} />
      <p className="itemName">{product.name}</p>
      <p className="itemPrice">{product.price.toLocaleString()}원</p>
      <p className="itemFavorite">♡ {product.favoriteCount}</p>
    </div>
  );
}

export default ProductCard;
