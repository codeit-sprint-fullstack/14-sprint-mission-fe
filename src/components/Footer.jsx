const socialLinks = [
  ['https://www.facebook.com/', '/images/ic_facebook.png', 'Facebook'],
  ['https://x.com/', '/images/ic_twitter.png', 'X'],
  ['https://www.youtube.com/', '/images/ic_youtube.png', 'YouTube'],
  ['https://www.instagram.com/', '/images/ic_instagram.png', 'Instagram'],
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links-group">
          <nav className="footer-links" aria-label="도움말">
            <a href="#/policy">Privacy Policy</a>
            <a href="#/faq">FAQ</a>
          </nav>
          <p className="footer-copy">©codeit - 2026</p>
        </div>
        <div className="footer-socials">
          {socialLinks.map(([href, src, label]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
              <img src={src} alt="" />
            </a>
          ))}
        </div>
        <p className="footer-copy footer-copy--desktop">©codeit - 2026</p>
        <nav className="footer-links footer-links--desktop" aria-label="도움말 데스크톱">
          <a href="#/policy">Privacy Policy</a>
          <a href="#/faq">FAQ</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
