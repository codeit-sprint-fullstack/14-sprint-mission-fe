import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>@codeit - 2024</p>

        <div className={styles.policyLinks}>
          <Link className={styles.policyLink} href="/privacy">
            Privacy Policy
          </Link>
          <Link className={styles.policyLink} href="/faq">
            FAQ
          </Link>
        </div>

        <div className={styles.socialLinks}>
          <a
            className={styles.socialLink}
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/ic_facebook.png"
              alt="페이스북"
              width={20}
              height={20}
            />
          </a>

          <a
            className={styles.socialLink}
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/ic_twitter.png"
              alt="엑스"
              width={19}
              height={16}
            />
          </a>

          <a
            className={styles.socialLink}
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/ic_youtube.png"
              alt="유튜브"
              width={20}
              height={20}
            />
          </a>

          <a
            className={styles.socialLink}
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/ic_instagram.png"
              alt="인스타그램"
              width={17}
              height={17}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
