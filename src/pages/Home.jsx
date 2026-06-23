import "../styles/home.css";
import "../styles/Global.css";

import { Link } from "react-router-dom";


export default function Home() {
  return (
    <>
      <header>
        <a href="/home">
          <img src="/images/logo/logo.svg" alt="판다마켓 홈" width="153" />
        </a>
        <nav aria-label="주요 메뉴">
          <ul>
            <li>
              <Link to="/login" id="loginLinkButton" className="button">로그인</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="with-header">
        <section id="hero" className="banner">
          <div className="wrapper">
            <h1>
              일상의 모든 물건을
              <br />
              거래해 보세요
            </h1>
            <Link to="/items" className="button pill-button">
              구경하러 가기
            </Link>
          </div>
        </section>

        <section id="features" className="wrapper">
          <div className="feature">
            <img
              src="/images/home/feature1-image.png"
              alt="인기 상품"
              width="50%"
            />
            <div className="feature-content">
              <p className="feature-tag">Hot item</p>
              <h2>
                인기 상품을
                <br />
                확인해 보세요
              </h2>
              <p className="feature-description">
                가장 HOT한 중고거래 물품을
                <br />
                판다마켓에서 확인해 보세요
              </p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-content">
              <p className="feature-tag">Search</p>
              <h2>
                구매를 원하는
                <br />
                상품을 검색하세요
              </h2>
              <p className="feature-description">
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </p>
            </div>
            <img
              src="/images/home/feature2-image.png"
              alt="검색 기능"
              width="50%"
            />
          </div>
          <div className="feature">
            <img
              src="/images/home/feature3-image.png"
              alt="판매 상품 등록"
              width="50%"
            />
            <div className="feature-content">
              <p className="feature-tag">Register</p>
              <h2>
                판매를 원하는
                <br />
                상품을 등록하세요
              </h2>
              <p className="feature-description">
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </section>

        <section id="bottomBanner" className="banner">
          <div className="wrapper">
            <h2>
              믿을 수 있는
              <br />
              판다마켓 중고거래
            </h2>
          </div>
        </section>
      </main>

      <footer>
        <div>©codeit - 2024</div>
        <div id="footerMenu">
          <ul>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </div>
        <div id="socialMedia">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="images/social/facebook-logo.svg"
              alt="페이스북"
              width="20"
            />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="images/social/twitter-logo.svg" alt="트위터" width="20" />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="images/social/youtube-logo.svg" alt="유튜브" width="20" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="images/social/instagram-logo.svg"
              alt="인스타그램"
              width="20"
            />
          </a>
        </div>
      </footer>
    </>
  );
}
