import Image from 'next/image';
import Link from 'next/link';

const socialLinks = [
  ['https://www.facebook.com/', '/images/ic_facebook.png', 'Facebook'],
  ['https://x.com/', '/images/ic_twitter.png', 'X'],
  ['https://www.youtube.com/', '/images/ic_youtube.png', 'YouTube'],
  ['https://www.instagram.com/', '/images/ic_instagram.png', 'Instagram'],
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links-group">
          <nav className="footer-links" aria-label="도움말">
            <Link href="/policy">Privacy Policy</Link>
            <Link href="/faq">FAQ</Link>
          </nav>
          <p className="footer-copy">©codeit - 2024</p>
        </div>
        <div className="footer-socials">
          {socialLinks.map(([href, src, label]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
              <Image src={src} width={40} height={40} alt="" />
            </a>
          ))}
        </div>
        <p className="footer-copy footer-copy--desktop">©codeit - 2024</p>
        <nav className="footer-links footer-links--desktop" aria-label="도움말 데스크톱">
          <Link href="/policy">Privacy Policy</Link>
          <Link href="/faq">FAQ</Link>
        </nav>
      </div>
    </footer>
  );
}
