import facebookIcon from '../assets/icon/ic_facebook.png';
import twitterIcon from '../assets/icon/ic_twitter.png';
import youtubeIcon from '../assets/icon/ic_youtube.png';
import instagramIcon from '../assets/icon/ic_instagram.png';
import '../Footer/Footer.css'

function Footer() {
  return (
    <footer>
        <div className='footerWrap'>
            <p>©codeit - 2024</p>
            <ul className='footerEtcLink'>
                <li>
                    <a href="/">Privacy Policy</a>
                </li>
                <li>
                    <a href="/">FAQ</a>
                </li>
            </ul>
            <ul className='footerSnsLink'>
                <li>
                    <a href="/">
                        <img src={facebookIcon} alt="페이스북" />
                    </a>
                </li>
                <li>
                    <a href="/">
                        <img src={twitterIcon} alt="트위터" />
                    </a>
                </li>
                <li>
                    <a href="/">
                        <img src={youtubeIcon} alt="유튜브" />
                    </a>
                </li>
                <li>
                    <a href="/">
                        <img src={instagramIcon} alt="인스타그램" />
                    </a>
                </li>
            </ul>
        </div>
    </footer>
  );
}

export default Footer;