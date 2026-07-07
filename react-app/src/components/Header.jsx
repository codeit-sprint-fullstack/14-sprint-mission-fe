import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import logoImage from '../assets/logo.png'
import logoText from '../assets/logo-text.png'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <NavLink to="/" className={styles.logo}>
            <img
              src={logoImage}
              alt="판다마켓"
              className={styles.logoDesktop}
            />
            <img src={logoText} alt="판다마켓" className={styles.logoMobile} />
          </NavLink>

          <nav className={styles.nav}>
            <NavLink
              to="/articles"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              자유게시판
            </NavLink>
            <NavLink
              to="/items"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              중고마켓
            </NavLink>
          </nav>
        </div>

        <NavLink to="/login" className={styles.loginButton}>
          로그인
        </NavLink>
      </div>
    </header>
  )
}

export default Header
