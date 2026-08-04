import Link from "next/link";
import Image from "next/image";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-contents">
        <div className="footer-text">©codeit - 2024</div>

        <div className="footer-links">
          <Link href="/privacy" className="footer-link">
            Privacy Policy
          </Link>
          <Link href="/faq" className="footer-link">
            FAQ
          </Link>
        </div>

        <div className="footer-logo">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/ic_facebook.png"
              alt="페이스북 로고"
              width={20}
              height={20}
            />
          </a>

          <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/ic_twitter.png"
              alt="트위터 로고"
              width={20}
              height={20}
            />
          </a>

          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/ic_youtube.png"
              alt="유튜브 로고"
              width={20}
              height={20}
            />
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/ic_instagram.png"
              alt="인스타 로고"
              width={20}
              height={20}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
