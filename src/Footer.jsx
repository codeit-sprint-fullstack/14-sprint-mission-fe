import facebook from "./assets/ic_facebook.png";
import twitter from "./assets/ic_twitter.png";
import youtube from "./assets/ic_youtube.png";
import instagram from "./assets/ic_instagram.png";
import "./Footer.css";


function Footer() {
  return (
    <>
      <footer className="footer-container">
        <div className="footer-contents">
          <div className="footer-text">
            ©codeit - 2024
          </div>
          <div className="footer-links">
            <a href="privacy.html" className="footer-link">
              Privacy Policy
            </a>
            <a href="faq.html" className="footer-link">
              FAQ
            </a>
          </div>
          <div className="footer-logo">
            <a href="https://www.facebook.com/" target="_blank">
              <img src={facebook} alt="페이스북 로고" />
            </a>
            <a href="https://x.com/" target="_blank">
              <img src={twitter} alt="트위터 로고" />
            </a>
            <a href="https://www.youtube.com/" target="_blank">
              <img src={youtube} alt="유튜브 로고" />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <img src={instagram} alt="인스타 로고" />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;



