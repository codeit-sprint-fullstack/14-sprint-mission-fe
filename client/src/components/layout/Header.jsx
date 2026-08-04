import logo from '@/assets/ic_logo.png';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerLeft}>
        <Link href='/' className={styles.logo}>
          <Image 
            src={logo}
            width={40}
            height={40}
            loading='eager'
            alt='판다마켓 로고'
          />
          <span className={styles.logoTitle}>판다마켓</span>
        </Link>
        <nav className={styles.nav}>
          <Link href='/articles' className={styles.navLink}>
            자유게시판
          </Link>
          <Link href='/products' className={styles.navLink}>
            중고마켓
          </Link>
        </nav>
      </div>
      <Link href='/signin' className={styles.signinLink}>
        로그인
      </Link>
    </header>
  )
}