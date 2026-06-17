function ProductCard({ product }) {
  const {
    name,
    price,
    favoriteCount,
    images,
  } = product;

  return (
    <div>
      <img src={images[0]} alt={name} />
      <p>{name}</p>
      <p>{price}</p>
      <p>{favoriteCount}</p>
    </div>
  );
}

export default ProductCard;