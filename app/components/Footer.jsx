import IconFB from "@/public/ic_facebook.svg";
import IconTW from "@/public/ic_twitter.svg";
import IconYT from "@/public/ic_youtube.svg";
import IconIG from "@/public/ic_instagram.svg";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footInfo}>
        <p>©codeit - 2026</p>
        <p>
          <Link href="">Privacy Policy</Link>
          <Link href="">FAQ</Link>
        </p>
        <p>
          <Link
            href="https://www.fLinkcebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={IconFB} alt="페이스북" width={20} />
          </Link>
          <Link
            href="https://x.com/?lLinkng=ko"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={IconTW} alt="트위터" width={20} />
          </Link>
          <Link
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={IconYT} alt="유튜브" width={20} />
          </Link>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={IconIG} alt="인스타그램" width={20} />
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
