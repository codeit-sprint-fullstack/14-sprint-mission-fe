import BestProducts from "../pages/BestProducts";
import ProductList from "../pages/ProductList";

import { getArticleList } from "../js/ArticleService";
import { Link } from "react-router-dom";

import "../styles/Items.css";

export default function Items() {
  return (
    <>
      <header>
        <div className="header-left">
          <a href="/">
            <img src="/images/logo/logo.svg" alt="판다마켓 홈" width="153" />
          </a>

          <nav aria-label="주요 메뉴">
            <ul className="gnb-menu">
              <li>
                <Link to="/articles">자유게시판</Link>
              </li>
              <li>
                <Link to="/">중고마켓</Link>
              </li>
            </ul>
          </nav>
        </div>

        <Link to="/login" id="loginLinkButton" className="button">
          로그인
        </Link>
      </header>

      <main className="wrapper item-page">
        <BestProducts />
        <ProductList />
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
