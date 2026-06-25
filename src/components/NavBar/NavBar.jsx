import { Link } from "react-router-dom";
import pandaLogo from "../../assets/panda-logo.svg";
import "./NavBar.css";

function NavBar() {
  return (
    <>
      <nav className="nav-container">
        <div className="nav-wrapper">
          <div className="logo-wrapper">
            <Link to="/" className="logo-group">
              <img className="panda-logo" src={pandaLogo} alt="판다 얼굴" />
              <span className="logo-text">
                판다마켓
              </span>
            </Link>
            <div className="nav-texts">
              <Link to="#" className="nav-text">
                자유게시판
              </Link>
              <Link to="/items" className="nav-text">
                중고마켓
              </Link>
            </div>
          </div>
          <div className="button-group">
            <Link to="/login" className="login-button">
              로그인
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;