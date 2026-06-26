import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  return (
      <header>
        <div className="header-left">
          <a href="/">
            <img src="/images/logo/logo.svg" alt="판다마켓 홈" width="153"  className="logo-img"/>
            <span className="logo-text">판다마켓</span>
          </a>

          <nav aria-label="주요 메뉴">
            <ul className="gnb-menu">
              <li>
                <Link to="/articles">자유게시판</Link>
              </li>
              <li>
                <Link to="/items" style={pathname === "/items" ? {color: "#3692FF"} : undefined}>중고마켓</Link>
              </li>
            </ul>
          </nav>
        </div>

        <Link to="/login" id="loginLinkButton" className="button">
          로그인
        </Link>
      </header>
  );
}