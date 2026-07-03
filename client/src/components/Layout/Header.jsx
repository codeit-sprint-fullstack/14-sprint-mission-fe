import logoIcon from '../../assets/ic_logo.png'

import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <a className={styles.logo} href="/">
          <img className={styles.icon} src={logoIcon} alt="판다마켓 로고" />
          <h1 className={styles.title}>판다마켓</h1>
        </a>
        <ul className={styles.links}>
          <li><a className={styles.link} href="/">자유게시판</a></li>
          <li><a className={styles.link} href="/">중고마켓</a></li>
        </ul>
      </div>
      <a className={styles.loginBtn} href="/">로그인</a>
    </header>
  )
}

export default Header