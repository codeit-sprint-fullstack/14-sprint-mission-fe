import styles from './Header.module.css'
import logoImage from '../assets/logo.png'
import logoText from '../assets/logo-text.png'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <a href="/" className={styles.logo}>
            <img
              src={logoImage}
              alt="판다마켓"
              className={styles.logoDesktop}
            />
            <img src={logoText} alt="판다마켓" className={styles.logoMobile} />
          </a>

          <nav className={styles.nav}>
            <a href="/articles" className={styles.navLink}>
              자유게시판
            </a>
            <a href="/" className={styles.navLink}>
              중고마켓
            </a>
          </nav>
        </div>

        <a href="/login" className={styles.loginButton}>
          로그인
        </a>
      </div>
    </header>
  )
}

export default Header
