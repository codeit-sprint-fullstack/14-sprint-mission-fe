'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getUserProfileQueryOptions } from '@/queries/userQueries'
import styles from '@/components/common/Header.module.css'

function Header() {
  const pathname = usePathname()
  const isLandingPage = pathname === '/'

  // 초기값을 생략하여 아직 localStorage 확인 전에는 undefined로 구분
  const [accessToken, setAccessToken] = useState()

  // 최초 마운트 시 실행
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken')

    setAccessToken(storedAccessToken)
  }, [])

  const { data: user, isError: isUserError } = useQuery({
    ...getUserProfileQueryOptions(),
    enabled: Boolean(accessToken),
  })

  // user 정보 요청 실패 후 실행
  useEffect(() => {
    if (!isUserError) return

    const storedAccessToken = localStorage.getItem('accessToken')

    if (!storedAccessToken) {
      setAccessToken(null)
    }
  }, [isUserError])

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
      {accessToken !== undefined &&
        (accessToken ? (
          <div className={styles.userProfile}>
            <Image
              className={styles.profileImage}
              src={user?.image || '/ic_profile.svg'}
              alt={user?.nickname ? `${user.nickname} 프로필` : '기본 프로필'}
              width={40}
              height={40}
            />
            {user?.nickname && (
              <span className={styles.nickname}>{user.nickname}</span>
            )}
          </div>
        ) : (
          <Link href="/signin" className={styles.loginButton}>
            로그인
          </Link>
        ))}
    </header>
  )
}

export default Header
