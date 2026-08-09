import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Header.module.css";

import pandaLogo from "@/assets/logo.png";
import pandaLogoM from "@/assets/logoM.png";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerCont}>
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <Link href="/" className={styles.logo}>
              <Image
                className={styles.logoPc}
                src={pandaLogo}
                alt="판다마켓 로고"
              />
              <Image
                className={styles.logoMo}
                src={pandaLogoM}
                alt="판다마켓 모바일 로고"
              />
            </Link>

            <div className={styles.headerMenu}>
              <div className={`${styles.menu} ${styles.freeBoard}`}>
                <Link href="/freeboard">자유게시판</Link>
              </div>

              <div className={`${styles.menu} ${styles.usedMarket}`}>
                <Link href="/items">중고마켓</Link>
              </div>
            </div>
          </div>

          <div className={styles.login}>
            <Link href="/login">로그인</Link>
          </div>
        </div>
      </div>
    </div>
  );
}