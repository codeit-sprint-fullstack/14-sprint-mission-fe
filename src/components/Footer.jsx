import facebookImg from '../assets/ic_facebook.png';
import twitterImg from '../assets/ic_twitter.png';
import youtubeImg from '../assets/ic_youtube.png';
import instagramImg from '../assets/ic_instagram.png';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="lastpart">
        <div className="since">
          <p>@codeit-2024</p>
        </div>

        <div className="faq">
          <a className="faq-link" href="/privacy">
            Privacy Policy
          </a>
          <a className="faq-link" href="/faq">
            FAQ
          </a>
        </div>

        <div className="adress">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={facebookImg} alt="페이스북" width="20" height="20" />
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <img src={twitterImg} alt="트위터" width="20" height="20" />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <img src={youtubeImg} alt="유튜브" width="20" height="20" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src={instagramImg} alt="인스타그램" width="20" height="20" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;