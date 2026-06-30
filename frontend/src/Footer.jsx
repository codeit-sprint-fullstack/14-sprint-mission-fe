
import facebookLogo from './assets/ic_facebook.png'
import xLogo from './assets/ic_twitter.png'
import youtubeLogo from './assets/ic_youtube.png'
import instaLogo from './assets/ic_instagram.png'

import './Footer.css'

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footerLeft">
          <div>©codeit - 2024</div>
        </div>
        <div className="footerCenter">
          <a href="privacy.html">Privacy Policy</a>
          <a href="faq.html">FAQ</a>
        </div>
        <div className="footerRight">
          <a href="http://facebook.com" target="_blank">
            <img src={facebookLogo} alt="페이스북"></img>
          </a>
          <a href="http://x.com" target="_blank">
            <img src={xLogo} alt="트위터"></img>
          </a>
          <a href="http://youtube.com" target="_blank">
            <img src={youtubeLogo} alt="유튜브"></img>
          </a>
          <a href="http://instagram.com" target="_blank">
            <img src={instaLogo} alt="인스타그램"></img>
          </a>
        </div>
      </div>
    </>
  )
}

export default Footer