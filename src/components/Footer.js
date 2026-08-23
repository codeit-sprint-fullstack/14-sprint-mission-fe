import Link from "next/link";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerCont}>
          <p className={styles.copyRight}>©codeit - 2024</p>

          <div className={styles.policeWrap}>
            <Link href="/">Privacy Policy</Link>
            <Link href="/">FAQ</Link>
          </div>

          <div className={styles.footerSns}>
            <Link href="/" className={styles.facebook}></Link>
            <Link href="/" className={styles.twitter}></Link>
            <Link href="/" className={styles.youtube}></Link>
            <Link href="/" className={styles.insta}></Link>
          </div>
        </div>
      </div>
    </div>
  );
}