import { Link } from "react-router-dom";

function MainPage() {
    return (
        <>
            <div className="hero-section">
                <div className="hero-content">
                    <div className="hero-text">
                        <h2>일상의 모든 물건을<br /> 거래해 보세요</h2>
                        <Link to="/items">
                            <div className="item-btn">구경하러 가기</div>
                        </Link>
                    </div>
                    <img className="hero-img" src="/img/Img_home_top.png" alt="메인 섹션 이미지" />
                </div>
            </div>

            <div className="card-container">
                <img src="/img/Img_home_01.png" alt="" />
                <div className="card-text">
                    <span>Hot item</span>
                    <h2>인기 상품을<br />확인해 보세요</h2>
                    <p>가장 HOT한 중고거래 물품을<br />판다 마켓에서 확인해보세요</p>
                </div>
            </div>

            <div className="card-container reverse">
                <div className="card-text">
                    <span>Search</span>
                    <h2>인기 상품을<br />확인해 보세요</h2>
                    <p>구매하고 싶은 물품은 검색해서<br />쉽게 찾아보세요</p>
                </div>
                <img src="/img/Img_home_02.png" alt="" />
            </div>

            <div className="card-container">
                <img src="/img/Img_home_03.png" alt="" />
                <div className="card-text">
                    <span>Register</span>
                    <h2>판매를 원하는<br />상품을 등록하세요</h2>
                    <p>어떤 물건이든 판매하고 싶은 상품을<br />쉽게 등록하세요</p>
                </div>
            </div>

            <div className="hero-section">
                <div className="hero-content align-center">
                    <div className="hero-text">
                        <h2>믿을 수 있는<br />판다마켓 중고 거래</h2>
                    </div>
                    <img className="hero-img" src="/img/Img_home_bottom.png" alt="메인 섹션 이미지" />
                </div>
            </div>
        </>
    )
}

export default MainPage;