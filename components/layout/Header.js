import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Header.module.css";

export default function Header() {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link className={styles.logo} href="/" aria-label="판다마켓 홈">
            <Image
              className={styles.desktopLogo}
              src="/images/logo.png"
              alt="판다마켓"
              width={153}
              height={40}
              priority
            />
            <Image
              className={styles.mobileLogo}
              src="/images/logo-text.png"
              alt="판다마켓"
              width={100}
              height={25}
              priority
            />
          </Link>
          <nav className={styles.nav} aria-label="주요 메뉴">
            <Link
              className={`${styles.navLink} ${router.pathname.startsWith("/articles") ? styles.active : ""}`}
              href="/articles"
            >
              자유게시판
            </Link>
            <Link
              className={`${styles.navLink} ${router.pathname.startsWith("/items") ? styles.active : ""}`}
              href="/items"
            >
              중고마켓
            </Link>
          </nav>
        </div>
        <Link className={styles.loginButton} href="/login">
          로그인
        </Link>
      </div>
    </header>
  );
}
