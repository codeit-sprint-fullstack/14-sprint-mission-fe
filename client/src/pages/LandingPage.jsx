import { Link } from 'react-router-dom'
import topImage from '../assets/img_home_top.png'
import homeImage01 from '../assets/img_home_01.png'
import homeImage02 from '../assets/img_home_02.png'
import homeImage03 from '../assets/img_home_03.png'
import bottomImage from '../assets/img_home_bottom.png'
import './LandingPage.css'

function LandingPage() {
  return (
    <>
      <section className="landing-top-banner">
        <div className="landing-top-contents">
          <h1>
            일상의 모든 물건을
            <br />
            거래해보세요
          </h1>
          <Link to="/items" className="landing-searching-button">
            구경하러 가기
          </Link>
        </div>
        <img
          className="landing-banner-image"
          src={topImage}
          alt="판다마켓 메인 이미지"
        />
      </section>

      <main className="landing-main">
        <section className="landing-section landing-section-left">
          <img
            className="landing-main-image"
            src={homeImage01}
            alt="인기 상품 이미지"
          />
          <div className="landing-main-contents">
            <p className="landing-category">Hot Item</p>
            <h3>
              인기 상품을
              <br />
              확인해 보세요
            </h3>
            <p className="landing-description">
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </section>

        <section className="landing-section landing-section-right">
          <div className="landing-main-contents">
            <p className="landing-category">Search</p>
            <h3>
              구매를 원하는
              <br />
              상품을 검색하세요
            </h3>
            <p className="landing-description">
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
          <img
            className="landing-main-image"
            src={homeImage02}
            alt="상품 검색 이미지"
          />
        </section>

        <section className="landing-section landing-section-left">
          <img
            className="landing-main-image"
            src={homeImage03}
            alt="상품 등록 이미지"
          />
          <div className="landing-main-contents">
            <p className="landing-category">Register</p>
            <h3>
              판매를 원하는
              <br />
              상품을 등록하세요
            </h3>
            <p className="landing-description">
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </section>
      </main>

      <section className="landing-bottom-banner">
        <div className="landing-bottom-contents">
          <h2>
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </h2>
        </div>
        <img
          className="landing-bottom-image"
          src={bottomImage}
          alt="판다마켓 하단 이미지"
        />
      </section>
    </>
  )
}

export default LandingPage
