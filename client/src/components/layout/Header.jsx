"use client";

import logo from "@/assets/ic_logo.png";
import profile from '@/assets/ic_profile.png';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import { useUser } from "@/queries/auth";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isArticlesPage = pathname.startsWith("/articles");
  const isProductsPage = pathname.startsWith("/products");

  const { data: user } = useUser();

  return (
    <header className={styles.wrapper}>
      <div className={styles.headerLeft}>
        <Link href="/" className={styles.logo}>
          <Image
            src={logo}
            width={40}
            height={40}
            loading="eager"
            alt="판다마켓 로고"
          />
          <span className={styles.logoTitle}>판다마켓</span>
        </Link>
        {!isHomePage && (
          <nav className={styles.nav}>
            <Link
              href="/articles"
              className={`${styles.navLink} ${
                isArticlesPage ? styles.active : ""
              }`}
            >
              자유게시판
            </Link>
            <Link
              href="/products"
              className={`${styles.navLink} ${
                isProductsPage ? styles.active : ""
              }`}
            >
              중고마켓
            </Link>
          </nav>
        )}
      </div>
      { user ? (
        <div className={styles.userProfile}>
          <Image
            src={profile}
            width={40}
            height={40}
            alt=''
          />
          <p className={styles.userNickname}>
            {user.nickname}
          </p>
        </div>
      ) : (
        <Link href="/signin" className={styles.signinLink}>
          로그인
        </Link>
      )}
    </header>
  );
}
