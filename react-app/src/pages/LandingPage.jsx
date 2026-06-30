import './LandingPage.css'
import Footer from '../components/Footer.jsx'

import logo from '../assets/logo.png'
import homeTop from '../assets/Img_home_top.png'
import home01 from '../assets/Img_home_01.png'
import home02 from '../assets/Img_home_02.png'
import home03 from '../assets/Img_home_03.png'
import homeBottom from '../assets/Img_home_bottom.png'

function LandingPage() {
  return (
    <>
      <header className="gnb">
        <div className="gnb-inner">
          <a href="/" className="logo">
            <img src={logo} alt="판다마켓 로고" />
          </a>

          <a href="/login" className="login-button">
            로그인
          </a>
        </div>
      </header>

      <main>
        <section className="home-top">
          <div className="content-wrapper home-top-inner">
            <div className="home-top-text">
              <h1>
                일상의 모든 물건을
                <br />
                거래해 보세요
              </h1>

              <a href="/items" className="primary-button">
                구경하러 가기
              </a>
            </div>

            <img src={homeTop} alt="판다 캐릭터" className="home-top-image" />
          </div>
        </section>

        <section className="info-section">
          <div className="info-card">
            <img src={home01} alt="인기 상품" />
            <div className="info-text">
              <span>Hot item</span>
              <h2>
                인기 상품을 <br className="desktop-break" />
                확인해 보세요
              </h2>
              <p>
                가장 HOT한 중고거래 물품을
                <br />
                판다 마켓에서 확인해 보세요
              </p>
            </div>
          </div>
        </section>

        <section className="second-info-section">
          <div className="second-info-card">
            <div className="second-info-text">
              <span>Search</span>
              <h2>
                구매를 원하는 <br className="desktop-break" />
                상품을 검색하세요
              </h2>
              <p>
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </p>
            </div>
            <img src={home02} alt="검색 이미지" />
          </div>
        </section>

        <section className="third-info-section">
          <div className="third-info-card">
            <img src={home03} alt="상품 등록" />
            <div className="third-info-text">
              <span>Register</span>
              <h2>
                판매를 원하는 <br className="desktop-break" />
                상품을 등록하세요
              </h2>
              <p>
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </section>

        <section className="bottom-banner">
          <div className="content-wrapper banner-inner">
            <div className="banner-text">
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </div>

            <img src={homeBottom} alt="판다 이미지" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default LandingPage
