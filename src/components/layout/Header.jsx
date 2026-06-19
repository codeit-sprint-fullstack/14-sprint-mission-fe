import { Link } from 'react-router-dom'
import logo from '../../assets/logos/logo.svg'
import './Header.css'

const Header = () => {
  return (
    <header className="site-header">
      <nav className="site-header__nav" aria-label="주요 메뉴">
        <Link to="/">
          <img src={logo} alt="판다마켓 로고" className="site-header__logo" />
        </Link>

        <Link to="/login" className="site-header__login-link">
          로그인
        </Link>
      </nav>
    </header>
  )
}

export default Header
