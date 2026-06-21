import "./salePdt.css";
//목록 리스트 순서 설정
const SalePdtItem = ({ item }) => {
  return (
    <li>
      <div>
        <img className="sale-img" src={item.images[0]} alt={item.name} />
        <h1>상품이름 : {item.name}</h1>
        <p>가격 : {item.price}</p>
        <p>좋아요 : {item.favoriteCount}</p>
      </div>
    </li>
  );
};

function SalePdt({ items = [] }) {
  return (
    <ul className="sale-list">
      {items.map((item) => (
        <SalePdtItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default SalePdt;
