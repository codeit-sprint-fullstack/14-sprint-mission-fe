import heartImg from '../assets/img/ic_heart.png';

function MarketItem({ item }) {
    return (
        <div className="market_item">
            <div className="img_box">
                <img src={item.images[0]} alt="상품 이미지"/>
            </div>
            <div className="item_title">{item.name}</div>
            <div className="item_price">{item.price.toLocaleString()}원</div>
            <div className="item_favorite">
                <img src={heartImg} alt="관심상품 아이콘"/> {item.favoriteCount}
            </div>
        </div>
    );
}

export default MarketItem;