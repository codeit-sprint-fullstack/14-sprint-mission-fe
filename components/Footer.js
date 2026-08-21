"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrapper ${styles.inner}`}>
        <div className={styles.copyright}>©codeit - 2024</div>

        <nav className={styles.footerMenu}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/faq">FAQ</Link>
        </nav>

        <div className={styles.socialMedia}>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <Image src="/images/social/facebook-logo.svg" alt="페이스북" width={20} height={20} />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <Image src="/images/social/twitter-logo.svg" alt="트위터" width={20} height={20} />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <Image src="/images/social/youtube-logo.svg" alt="유튜브" width={20} height={20} />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <Image src="/images/social/instagram-logo.svg" alt="인스타그램" width={20} height={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}