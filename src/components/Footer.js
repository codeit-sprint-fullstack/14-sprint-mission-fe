import Image from "next/image";
import Link from "next/link";

import styles from "./Footer.module.css";

// 페이지 하단 푸터 영역
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <p className={styles.copyright}>
          ©codeit - 2024
        </p>
      </div>

      <div className={styles.linkGroup}>
        <Link
          href="/privacy"
          className={styles.link}
        >
          Privacy Policy
        </Link>

        <Link
          href="/faq"
          className={styles.link}
        >
          FAQ
        </Link>
      </div>

      <div className={styles.sns}>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/img/ic_facebook.png"
            alt="페이스북 로고"
            width={20}
            height={20}
            className={styles.icon}
          />
        </a>

        <a
          href="https://x.com/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/img/Vector.png"
            alt="엑스 로고"
            width={20}
            height={20}
            className={styles.icon}
          />
        </a>

        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/img/Vector (1).png"
            alt="유튜브 로고"
            width={20}
            height={20}
            className={styles.icon}
          />
        </a>

        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/img/Vector (2).png"
            alt="인스타그램 로고"
            width={20}
            height={20}
            className={styles.icon}
          />
        </a>
      </div>
    </footer>
  );
}