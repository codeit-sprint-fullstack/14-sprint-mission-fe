import facebookIcon from '../img/ic_facebook.png'
import xIcon from '../img/Vector.png'
import youtubeIcon from '../img/Vector (1).png'
import instagramIcon from '../img/Vector (2).png'

function Footer() {
  return (
    <footer className="last">
      <div className="text1_group">
        <p className="codeit">
          ©codeit - 2024
        </p>
      </div>

      <div className="text2_group">
        <a href="/privacy" className="privacy">
          Privacy Policy
        </a>

        <a href="/faq" className="faq">
          FAQ
        </a>
      </div>

      <div className="sns">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={facebookIcon}
            alt="페이스북 로고"
            className="facebook"
          />
        </a>

        <a
          href="https://x.com/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={xIcon}
            alt="엑스 로고"
            className="twiter"
          />
        </a>

        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={youtubeIcon}
            alt="유튜브 로고"
            className="youtube"
          />
        </a>

        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={instagramIcon}
            alt="인스타그램 로고"
            className="insta"
          />
        </a>
      </div>
    </footer>
  )
}

export default Footer