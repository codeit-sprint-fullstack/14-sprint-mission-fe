import facebook from '@/assets/ic_facebook.png';
import twitter from '@/assets/ic_twitter.png';
import youtube from '@/assets/ic_youtube.png';
import instagram from '@/assets/ic_instagram.png';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <p className={styles.copyright}>
        &copy;codeit - 2024
      </p>
      <nav className={styles.nav}>
        <Link href='/privacy' className={styles.navLink}>
          Privacy Policy
        </Link>
        <Link href='/faq' className={styles.navLink}>
          FAQ
        </Link>
      </nav>
      <div className={styles.socialLink}>
        <Link href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>
          <Image
            src={facebook}
            width={18}
            height={18}
            loading='eager'
            alt='페이스북 로고'
          />
        </Link>
        <Link href='https://x.com/' target='_blank' rel='noopener noreferrer'>
          <Image
            src={twitter}
            width={18}
            height={18}
            loading='eager'
            alt='X 로고'
          />
        </Link>
        <Link href='https://www.youtube.com/' target='_blank' rel='noopener noreferrer'>
          <Image 
            src={youtube}
            width={18}
            height={18}
            loading='eager'
            alt='유튜브 로고'
          />
        </Link>
        <Link href='https://www.instagram.com/' target='_blank' rel='noopener noreferre'>
          <Image 
            src={instagram}
            width={18}
            height={18}
            loading='eager'
            alt='인스타그램 로고'
          />
        </Link>
      </div>
    </footer>
  )
}