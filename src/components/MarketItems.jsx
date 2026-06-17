import arrowDownImg from '../assets/img/arrow_down.svg';
import MarketItem from "./MarketItem.jsx";
import searchIcon from "../assets/img/ic_search.svg";

function MarketItems({marketItems}) {
    return (
        <section className="item_section">
            <div className="section_title">판매 중인 상품
                <div className="search_wrap">
                    <div className="input_wrap">
                        <input type="text" placeholder="검색할 상품을 입력해주세요"/>
                        <img src={searchIcon} alt="검색 아이콘"/>
                    </div>
                    <button type="button">상품 등록하기</button>
                    <div className="select_wrap">
                        <div className="select_display">
                            최신순
                            <img src={arrowDownImg} alt="필터 목록 버튼" />
                        </div>
                        <div className="select_btn_wrap">
                            <div className="select_btn">
                                최신순
                            </div>
                            <div className="select_btn">
                                좋아요순
                            </div>
                        </div>
                    </div>
                </div></div>
            <div className="item_wrap">
                {marketItems.map((item) => (
                    <MarketItem key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}

export default MarketItems;