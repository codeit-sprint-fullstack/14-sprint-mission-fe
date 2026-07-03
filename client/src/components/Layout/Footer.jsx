import { Link } from 'react-router-dom'

import facebookIcon from '../../assets/ic_facebook.png'
import twitterIcon from '../../assets/ic_twitter.png'
import youtubeIcon from '../../assets/ic_youtube.png'
import instagramIcon from '../../assets/ic_instagram.png'

import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>&copy;codeit - 2024</p>
      <ul className={styles.links}>
        <li>
          <Link className={styles.link} to="/">Privacy Policy</Link>
        </li>
        <li>
          <Link className={styles.link} to="/">FAQ</Link>
        </li>
      </ul>
      <div className={styles.social}>
        <Link to="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <img src={facebookIcon} alt="페이스북 로고" />
        </Link>
        <Link to="https://x.com/" target="_blank" rel="noopener noreferrer">
          <img src={twitterIcon} alt="트위터 로고" />
        </Link>
        <Link to="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
          <img src={youtubeIcon} alt="유튜브 로고" />
        </Link>
        <Link to="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <img src={instagramIcon} alt="인스타그램 로고" />
        </Link>
      </div>
    </footer>
  )
}

export default Footer