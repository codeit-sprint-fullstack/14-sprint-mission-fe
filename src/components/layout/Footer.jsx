import facebookIcon from '../../assets/icons/ic_facebook.svg'
import youtubeIcon from '../../assets/icons/ic_youtube.svg'
import instagramIcon from '../../assets/icons/ic_instagram.svg'
import twitterIcon from '../../assets/icons/ic_twitter.svg'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="site-footer">
      <span className="site-footer__brand">@codeit - 2024</span>
      <nav className="site-footer__links" aria-label="footer menu">
        <a href="/privacy/">Privacy Policy</a>
        <a href="/faq/">FAQ</a>
      </nav>
      <nav className="site-footer__socials" aria-label="social links">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={facebookIcon} alt="facebook icon" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src={twitterIcon} alt="twitter icon" />
        </a>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={youtubeIcon} alt="youtube icon" />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instagramIcon} alt="instagram icon" />
        </a>
      </nav>
    </footer>
  )
}
export default Footer
