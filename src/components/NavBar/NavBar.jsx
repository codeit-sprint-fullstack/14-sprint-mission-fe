import pandaLogo from "../../assets/판다 얼굴.png";
import "./NavBar.css";

function NavBar() {
  return (
    <>
      <nav className="nav-container">
        <div className="nav-wrapper">
          <div className="logo-wrapper">
            <a href="index.html" className="logo-group">
              <img src={pandaLogo} alt="판다 얼굴" />
              <span className="logo-text">
                판다마켓
              </span>
            </a>
            <div className="nav-texts">
              <a href="#" className="nav-text">자유게시판</a>
              <a href="#" className="nav-text">중고마켓</a>
            </div>
          </div>
          <div className="button-group">
            <a href="login.html" className="login-button">
              로그인
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;