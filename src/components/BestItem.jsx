import MarketItem from "./MarketItem.jsx";

function BestItem({bestItems}) {
    return (
        <section className="item_section best">
            <div className="section_title">베스트 상품
            </div>
            <div className="item_wrap best">
                {bestItems.map((item) => (
                    <MarketItem key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}

export default BestItem;