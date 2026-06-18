import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <div className="inner">
        <Link className="logoLink" to="/">
          <img src="/img/panda_logo.png" alt="판다마켓 로고" />
          <span>판다마켓</span>
        </Link>
        <Link className="loginButton" to="/login">로그인</Link>
      </div>
    </div>
  );
}

export default Header;