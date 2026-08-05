const SNS_LINKS = [
  { href: 'https://www.facebook.com', src: '/img/ic_facebook.png', alt: '페이스북' },
  { href: 'https://www.twitter.com', src: '/img/ic_twitter.png', alt: '트위터' },
  { href: 'https://www.youtube.com', src: '/img/ic_youtube.png', alt: '유튜브' },
  { href: 'https://www.instagram.com', src: '/img/ic_instagram.png', alt: '인스타그램' },
];

function Footer() {
  return (
    <div className="footer">
      <div className="inner">
        <div className="footerLeft">codeit-2024</div>
        <div className="footerCenter">
          <a className="footerLink" href="/privacy">Privacy Policy</a>
          <a className="footerLink" href="/faq">FAQ</a>
        </div>
        <div className="footerRight">
          {SNS_LINKS.map(({ href, src, alt }) => (
            <a className="snsLink" key={alt} href={href} target="_blank" rel="noreferrer">
              <img src={src} alt={alt} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
