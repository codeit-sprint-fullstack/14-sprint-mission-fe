import facebookIcon from '../assets/ic_facebook.png';
import twitterIcon from '../assets/ic_twitter.png';
import youtubeIcon from '../assets/ic_youtube.png';
import instagramIcon from '../assets/ic_instagram.png';

function Footer() {
  return (
    <footer>
      <p>@codeit - 2024</p>
      <div>
        <a href="Privacy Policy.html">Privacy Policy</a>
        <a href="FAQ.html">FAQ</a>
      </div>
      <div>
        <img
          src={facebookIcon}
          alt="facebook"
          width="100"
        />
      </div>
    </footer>)
}

export default Footer;