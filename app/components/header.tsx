"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { useAuth } from "./authProvider";

export const Header = () => {
  const { accessToken, setAccessToken } = useAuth();
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/signUp") {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  };
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        <Image
          src="/images/panda_logo.svg"
          alt="판다마켓 로고"
          width={100}
          height={50}
          priority
          style={{ width: "auto", height: "auto" }}
        />
        <span>판다마켓</span>
      </Link>

      <Link href="/articles" className={styles.navLink}>
        <span>자유게시판</span>
      </Link>
      <Link href="/items" className={styles.navLink}>
        <span>중고마켓</span>
      </Link>

      {accessToken ? (
        <button onClick={handleLogout}>로그아웃</button>
      ) : (
        <Link href="/login" className={styles.loginButton}>
          로그인
        </Link>
      )}
    </header>
  );
};

export default Header;
