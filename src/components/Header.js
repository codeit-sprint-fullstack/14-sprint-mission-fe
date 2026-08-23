import Link from "next/link";
import styles from "./Header.module.css";


// 모든 페이지 위쪽에 공통으로 표시할 Header 컴포넌트
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* 로고를 클릭하면 메인 페이지인 "/" 주소로 이동 */}
        <Link href="/" className={styles.logo}>
          판다마켓
        </Link>

        {/* 사이트의 주요 페이지로 이동할 수 있는 메뉴 영역 */}
        <nav aria-label="주요 메뉴">
          {/* Next.js에서는 페이지 이동에 next/link의 Link를 사용 */}
          <Link href="/articles" className={styles.navigationLink}>
            자유게시판
          </Link>
        </nav>
        <p>중고마켓</p>
      </div>
    </header>
  );
}