import pandaFace from '../img/판다얼굴.png'

function Header({ children }) {
  return (
    <header className="top_bar">
      <div className="header-left">
        <a href="/" className="panda-logo">
          <img
            src={pandaFace}
            alt="판다 얼굴"
            className="panda_face"
          />

          <span className="logo-text">
            판다마켓
          </span>
        </a>

        {children && (
          <nav className="header-menu">
            {children}
          </nav>
        )}
      </div>

      <div className="Header_Login">
        <a href="/login" className="login-btn">
          로그인
        </a>
      </div>
    </header>
  )
}

export default Header