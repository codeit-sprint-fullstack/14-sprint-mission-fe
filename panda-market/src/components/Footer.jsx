import Image from 'next/image'
import Link from 'next/link'
import styles from '@/components/Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p className={styles.copyright}>@codeit - 2024</p>

        {/* 마이그레이션 전으로 우선 '/' 처리 */}
        <div className={styles.sitemap}>
          <Link href="/">Privacy Policy</Link>
          <Link href="/">FAQ</Link>
        </div>

        <div className={styles.socialMediaLink}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/ic_facebook.svg"
              alt="facebook"
              width={20}
              height={20}
            />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <Image src="/ic_twitter.svg" alt="twitter" width={20} height={20} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/ic_youtube.svg" alt="youtube" width={20} height={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/ic_instagram.svg"
              alt="instagram"
              width={20}
              height={20}
            />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
