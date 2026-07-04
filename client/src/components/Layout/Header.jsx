import { useLocation, Link, NavLink } from 'react-router-dom'

import logoIcon from '../../assets/ic_logo.png'

import styles from './Header.module.css'

function Header() {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Link className={styles.logo} to='/'>
          <img className={styles.icon} src={logoIcon} alt="판다마켓 로고" />
          <h1 className={styles.title}>판다마켓</h1>
        </Link>
        {!isLandingPage &&
          <ul className={styles.links}>
            <li>
              <Link className={styles.link} to='/'>자유게시판</Link>
            </li>
            <li>
              <NavLink 
                className={({ isActive }) => 
                  `${styles.link} ${isActive ? styles.active : ''}`} 
                to='/items'
              >
                중고마켓
              </NavLink>
            </li>
          </ul>
        }
      </div>
      <Link className={styles.loginBtn} to='/'>로그인</Link>
    </header>
  )
}

export default Header