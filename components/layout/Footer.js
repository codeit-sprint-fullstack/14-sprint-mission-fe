import Image from "next/image";

import styles from "./Footer.module.css";

const SOCIAL_LINKS = [
  { name: "페이스북", href: "https://facebook.com", icon: "ic_facebook.png" },
  { name: "트위터", href: "https://twitter.com", icon: "ic_twitter.png" },
  { name: "유튜브", href: "https://youtube.com", icon: "ic_youtube.png" },
  { name: "인스타그램", href: "https://instagram.com", icon: "ic_instagram.png" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>©codeit - 2024</p>
        <div className={styles.links}>
          <a href="/privacy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
        </div>
        <div className={styles.socials}>
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.name}
            >
              <Image
                src={`/images/${social.icon}`}
                alt=""
                width={20}
                height={20}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
