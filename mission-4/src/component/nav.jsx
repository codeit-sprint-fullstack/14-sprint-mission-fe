import "./Nav.css";

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-left">
        <a href="/" className="logo">
          <img src="{logo}" />
          <span>판다마켓</span>
        </a>
        <a>자유게시판</a>
        <a>중고마켓</a>
      </div>

      <div className="nav-right">
        <a href="/login">로그인</a>
      </div>
    </nav>
  );
}

export default Nav;
