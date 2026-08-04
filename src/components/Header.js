import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Header.module.css";

export default function Header() {
  const router = useRouter();
  const isBoardsPage = router.pathname.startsWith("/boards");

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link
            href="/boards"
            className={styles.logo}
            aria-label="판다마켓 자유게시판으로 이동"
          >
            <Image
              src="/images/logo.png"
              alt="판다마켓 로고"
              width={102}
              height={34}
              priority
            />
          </Link>

          <nav className={styles.navigation} aria-label="주요 메뉴">
            <Link
              href="/boards"
              className={`${styles.navLink} ${
                isBoardsPage ? styles.active : ""
              }`}
            >
              자유게시판
            </Link>

            <span className={styles.navLink}>중고마켓</span>
          </nav>
        </div>

        <button className={styles.loginButton} type="button">
          로그인
        </button>
      </div>
    </header>
  );
}
