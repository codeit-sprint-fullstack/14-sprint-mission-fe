import { NavLink } from 'react-router-dom'
import facebookIcon from '../assets/ic_facebook.png'
import twitterIcon from '../assets/ic_twitter.png'
import youtubeIcon from '../assets/ic_youtube.png'
import instagramIcon from '../assets/ic_instagram.png'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="copyright">@codeit - 2024</p>

        <div className="sitemap">
          <NavLink to="/">Privacy Policy</NavLink>
          <NavLink to="/">FAQ</NavLink>
        </div>

        <div className="social-media-link">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebookIcon} alt="facebook" />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <img src={twitterIcon} alt="twitter" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={youtubeIcon} alt="youtube" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagramIcon} alt="instagram" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
