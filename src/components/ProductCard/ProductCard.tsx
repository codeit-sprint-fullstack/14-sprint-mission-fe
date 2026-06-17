import HeartIcon from '../../assets/icon/ic_heart.png'

function ProductCard({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <img src={item.images?.[0]} alt={item.name} />
          <p>{item.name}</p>
          <p>{item.price.toLocaleString()}원</p>
          <div>
              <img src={ HeartIcon } alt="좋아요" />
              <p>240</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductCard;