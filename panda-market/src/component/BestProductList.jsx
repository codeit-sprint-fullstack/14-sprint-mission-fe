import '../css/ProductList.css'
import iconHeart from '../assets/ic_heart.svg'
function BestProductList ({items}){
  console.log(items)
  return (
    <div className="BestproductList">
      <ul className="itemList">
        {items.map((item) => {
          return (
            <li className="item">
              <div className="itemImg">
                <img src={item.images} alt={item.name}/>
              </div>
              <div className="itemName">{item.name}</div>     
              <div className="itemPrice">{item.price.toLocaleString()}원</div>
              <div className="itemFav">
                <img src={iconHeart} alt="찜" />{item.favoriteCount}
              </div> 
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default BestProductList