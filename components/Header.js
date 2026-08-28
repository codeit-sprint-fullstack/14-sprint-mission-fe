"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setUser(null);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/images/logo/logo-icon.svg"
              alt="판다마켓 로고"
              width={40}
              height={40.14}
            />
            <span className={styles.logoText}>판다마켓</span>
          </Link>
          {pathname !== "/" && (
            <nav className={styles.nav}>
              <Link
                href="/boards"
                className={pathname.startsWith("/boards") ? styles.active : ""}
              >
                자유게시판
              </Link>
              <Link href="/items">중고마켓</Link>
            </nav>
          )}
        </div>

        {user ? (
          <div className={styles.userArea}>
            <Image
              src="/images/board/ic_profile.svg"
              alt="프로필"
              width={40}
              height={40}
              className={styles.profileImage}
            />

            <span className={styles.nickname}>{user.nickname}</span>
          </div>
        ) : (
          <Link href="/login" className={styles.loginButton}>
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
