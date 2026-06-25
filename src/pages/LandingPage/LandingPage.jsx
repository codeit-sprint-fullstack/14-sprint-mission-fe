import { Link } from "react-router-dom";
import Img_home_top from "../../assets/Img_home_top.png";
import Img_home_01 from "../../assets/Img_home_01.png";
import Img_home_02 from "../../assets/Img_home_02.png";
import Img_home_03 from "../../assets/Img_home_03.png";
import Img_home_bottom from "../../assets/Img_home_bottom.png";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="whole-page">
      <header className="header-container">
        <div className="header-group">
          <div className="header-text-group">
            <h2 className="header-text">
              일상의 모든 물건을 <br />
              거래해 보세요
            </h2>
            <Link to="/items" className="watch-button">
              구경하러 가기
            </Link>
          </div>
          <div className="header-picture">
            <img src={Img_home_top} alt="판다 구경" />
          </div>
        </div>
      </header>

      <main>
        <section className="section1-container">
          <div className="section1-outline">
            <div className="section1-picture">
              <img src={Img_home_01} alt="인기 상품" />
            </div>
            <div className="item-content">
              <p className="item-keyword">
                Hot item
              </p>
              <h2 className="item-big-text">
                인기 상품을 <br />
                확인해 보세요
              </h2>
              <p className="item-text">
                가장 HOT한 중고거래 물품을<br />
                판다 마켓에서 확인해 보세요
              </p>
            </div>
          </div>
        </section>

        <section className="section2-container">
          <div className="section2-outline">
            <div className="section2-picture">
              <img src={Img_home_02} alt="상품 검색" />
            </div>
            <div className="item-content item-content-right">
              <p className="item-keyword">
                Search
              </p>
              <h2 className="item-big-text">
                구매를 원하는 <br />
                상품을 검색하세요
              </h2>
              <p className="item-text">
                구매하고 싶은 물품은 검색해서<br />
                쉽게 찾아보세요
              </p>
            </div>
          </div>
        </section>

        <section className="section3-container">
          <div className="section3-outline">
            <div className="section3-picture">
              <img src={Img_home_03} alt="상품 등록" />
            </div>
            <div className="item-content">
              <p className="item-keyword">
                Register
              </p>
              <h2 className="item-big-text">
                판매를 원하는 <br />
                상품을 등록하세요
              </h2>
              <p className="item-text">
                어떤 물건이든 판매하고 싶은 상품을<br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </section>

        <section className="section4-container">
          <div className="section4-group">
            <h2 className="section4-text">
              믿을 수 있는 <br />
              판다마켓 중고 거래
            </h2>
            <div className="section4-picture">
              <img src={Img_home_bottom} alt="판다마켓" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;