import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logos/logo.svg'
import './Header.css'

const Header = () => {
  return (
    <header className="site-header">
      <nav className="site-header__nav" aria-label="주요 메뉴">
        <div className="site-header__left">
          <Link to="/">
            <img src={logo} alt="판다마켓 로고" className="site-header__logo" />
          </Link>

          <div className="site-header__links">
            <NavLink
              to="/boards"
              className={({ isActive }) =>
                isActive
                  ? 'site-header__link site-header__link--active'
                  : 'site-header__link'
              }
            >
              자유게시판
            </NavLink>
            <NavLink
              to="/items"
              className={({ isActive }) =>
                isActive
                  ? 'site-header__link site-header__link--active'
                  : 'site-header__link'
              }
            >
              중고마켓
            </NavLink>
          </div>
        </div>

        <Link to="/login" className="site-header__login-link">
          로그인
        </Link>
      </nav>
    </header>
  )
}

export default Header
