import IconFB from '../assets/ic_facebook.svg';
import IconTW from '../assets/ic_twitter.svg';
import IconYT from '../assets/ic_youtube.svg';
import IconIG from '../assets/ic_instagram.svg';

function Footer() {
  return (
    <footer>
      <div className="foot-info">
        <p>©codeit - 2026</p>
        <p>
          <a href="">Privacy Policy</a>
          <a href="">FAQ</a>
        </p>
        <p>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><img src={IconFB} alt="페이스북"/></a>
          <a href="https://x.com/?lang=ko" target="_blank" rel="noopener noreferrer"><img src={IconTW} alt="트위터"/></a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><img src={IconYT} alt="유튜브"/></a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><img src={IconIG} alt="인스타그램"/></a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
