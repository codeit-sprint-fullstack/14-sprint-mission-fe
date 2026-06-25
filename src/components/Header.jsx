import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/panda-face.png';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <div className='header-left'>
        <Link to='/' className='header-logo'>
          <img className='panda-face' src={logo} alt='판다마켓 로고' />
          <span className='brand-logo'>판다마켓</span>
        </Link>

        <nav className='header-menu'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? 'header-menu-link active' : 'header-menu-link'
            }
          >
            자유게시판
          </NavLink>
          <NavLink
            to='/items'
            className={({ isActive }) =>
              isActive ? 'header-menu-link active' : 'header-menu-link'
            }
          >
            중고마켓
          </NavLink>
        </nav>
      </div>

      <Link to='/login' className='login-button'>
        로그인
      </Link>
    </header>)
}

export default Header;