import { Link } from 'react-router-dom'

import pandaFace from '../img/판다얼굴.png'

function Header({ children }) {
  return (
    <header className="top_bar">
      <div className="header-left">
        <Link
          to="/"
          className="panda-logo"
        >
          <img
            src={pandaFace}
            alt="판다 얼굴"
            className="panda_face"
          />

          <span className="logo-text">
            판다마켓
          </span>
        </Link>

        {children && (
          <nav className="header-menu">
            {children}
          </nav>
        )}
      </div>

      <div className="Header_Login">
        <Link
          to="/login"
          className="login-btn"
        >
          로그인
        </Link>
      </div>
    </header>
  )
}

export default Header