'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '@/components/Header.module.css'

function Header() {
  const pathname = usePathname()
  const isLandingPage = pathname === '/'
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Link href="/" className={styles.headerLogo}>
          <Image
            className={styles.pandaFace}
            src="/logo.svg"
            alt="판다마켓 로고"
            width={40}
            height={40}
          />
          <span className={styles.brandLogo}>판다마켓</span>
        </Link>

        {!isLandingPage && (
          <nav className={styles.headerMenu}>
            {/* startsWith()는 문자열이 특정 값으로 시작하면 true를 반환
            '/boards', '/boards/new', '/boards/1' → true */}
            <Link
              href="/boards"
              className={`${styles.headerMenuLink} ${
                pathname.startsWith('/boards') ? styles.active : ''
              }`}
            >
              자유게시판
            </Link>

            <Link
              href="/items"
              className={`${styles.headerMenuLink} ${
                pathname.startsWith('/items') ? styles.active : ''
              }`}
            >
              중고마켓
            </Link>
          </nav>
        )}
      </div>

      <Link href="/login" className={styles.loginButton}>
        로그인
      </Link>
    </header>
  )
}

export default Header
