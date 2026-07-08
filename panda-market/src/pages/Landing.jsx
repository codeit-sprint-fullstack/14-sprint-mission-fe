import { Link } from "react-router-dom";
import "../css/Landing.css"
import homeTopImg from "../assets/Img_home_top.png"
import hotItemImg from "../assets/Img_home_01.png"
import searchItemImg from "../assets/Img_home_02.png"
import registerItemImg from "../assets/Img_home_03.png"
import homeBottomImg from "../assets/Img_home_bottom.png"

function Landing() {
  return (
    <main>
      <section className="banner">
        <div className="bannerInner">
          <div className="bannerCont">
            <div className="bannerText">
              <p>일상의 모든 물건을 <br />거래해 보세요</p>
              <Link to="/Items" className="btn-view">구경하러 가기</Link>
            </div>
            <div className="bannerImg">
              <img src={homeTopImg} alt="판다마켓 배너 이미지" />
            </div>
          </div>
        </div>
      </section>
      <section className="mainCont">
        <div className="inner">
          <div className="contents hotItem">
            <div className="imgWrap">
              <img src={hotItemImg} alt="핫아이템 이미지" />
            </div>
            <div className="textWrap">
              <p className="category">Hot item</p>
              <p className="title">인기 상품을 <br />확인해 보세요</p>
              <p className="detail">가장 HOT한 중고거래 물품을 <br />판다 마켓에서 확인해 보세요</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mainCont">
        <div className="inner">
          <div className="contents searchItem">
            <div className="imgWrap">
              <img src={searchItemImg} alt="검색 이미지" />
            </div>
            <div className="textWrap">
              <p className="category">Search</p>
              <p className="title">구매를 원하는<br />상품을 검색하세요</p>
              <p className="detail">가장 HOT한 중고거래 물품을 <br />판다 마켓에서 확인해 보세요</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mainCont">
        <div className="inner">
          <div className="contents registerItem">
            <div className="imgWrap">
              <img src={registerItemImg} alt="등록 이미지" />
            </div>
            <div className="textWrap">
              <p className="category">Register</p>
              <p className="title">판매를 원하는 <br />상품을 등록하세요</p>
              <p className="detail">가장 HOT한 중고거래 물품을 <br />판다 마켓에서 확인해 보세요</p>
            </div>
          </div>
        </div>
      </section>
      <section className="banner bottom">
        <div className="bannerInner">
          <div className="bannerCont">
            <div className="bannerText">
              <p>믿을 수 있는 <br /> 판다마켓 중고거래</p>
            </div>
            <div className="bannerImg">
              <img src={homeBottomImg} alt="믿을 수 있는 판다마켓" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Landing;