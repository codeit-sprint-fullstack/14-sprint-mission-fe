import styles from './Footer.module.css'
import facebookimg from '../assets/ic_facebook.png'
import twitterimg from '../assets/ic_twitter.png'
import instagramimg from '../assets/ic_instagram.png'
import youtubeimg from '../assets/ic_youtube.png'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>©codeit - 2024</p>

        <div className={styles.links}>
          <a href="/privacy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
        </div>

        <div className={styles.socials}>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img src={facebookimg} alt="페이스북" />
          </a>

          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <img src={twitterimg} alt="트위터" />
          </a>

          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <img src={youtubeimg} alt="유튜브" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <img src={instagramimg} alt="인스타그램" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
