import heartImg from '../assets/img/ic_heart.png';
import itemDefaultImage from '../assets/img/img_default.png';
import { Link } from 'react-router-dom';

function MarketItem({ item }) {
    return (
        <div className="market_item">
            <Link to={`/items/${item._id}`}>
                <div className="img_box">
                    <img src={itemDefaultImage} alt="상품 이미지"/>
                </div>
                <div className="item_title">{item.name}</div>
                <div className="item_price">{item.price.toLocaleString()}원</div>
                <div className="item_favorite">
                    <img src={heartImg} alt="관심상품 아이콘"/> {item.favoriteCount}
                </div>
            </Link>
        </div>
    );
}

export default MarketItem;