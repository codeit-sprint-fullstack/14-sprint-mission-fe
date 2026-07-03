import facebookIcon from '../assets/ic_facebook.png'
import twitterIcon from '../assets/ic_twitter.png'
import youtubeIcon from '../assets/ic_youtube.png'
import instagramIcon from '../assets/ic_instagram.png'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>&copy;codeit - 2024</p>
      <ul className={styles.links}>
        <li><a className={styles.link} href="/">Privacy Policy</a></li>
        <li><a className={styles.link} href="/">FAQ</a></li>
      </ul>
      <div className={styles.social}>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><img src={facebookIcon} alt="페이스북 로고" /></a>
        <a href="https://x.com/" target="_blank" rel="noopener noreferrer"><img src={twitterIcon} alt="트위터 로고" /></a>
        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><img src={youtubeIcon} alt="유튜브 로고" /></a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><img src={instagramIcon} alt="인스타그램 로고" /></a>
      </div>
    </footer>
  )
}

export default Footer