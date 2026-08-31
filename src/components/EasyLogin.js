import Image from "next/image";

import styles from "./EasyLogin.module.css";

export default function EasyLogin() {
  return (
    <div className={styles.easyLogin}>
      <p className={styles.easyLoginText}>
        간편 로그인하기
      </p>

      <div className={styles.easyLoginIcons}>
        <a
          href="https://www.google.com/"
          target="_blank"
          rel="noreferrer"
          className={styles.easyLoginLink}
          aria-label="구글로 로그인하기"
        >
          <Image
            src="/img/google.png"
            alt="구글"
            width={42}
            height={42}
            className={styles.easyLoginIcon}
          />
        </a>

        <a
          href="https://www.kakaocorp.com/page/"
          target="_blank"
          rel="noreferrer"
          className={styles.easyLoginLink}
          aria-label="카카오로 로그인하기"
        >
          <Image
            src="/img/kakao.png"
            alt="카카오"
            width={42}
            height={42}
            className={styles.easyLoginIcon}
          />
        </a>
      </div>
    </div>
  );
}