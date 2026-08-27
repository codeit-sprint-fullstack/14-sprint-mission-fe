import style from "./Footer.module.css";

function Footer() {
  return (
    <footer className={style.footer}>
        <div className={style.info}>
          <div className={style.credit}>
            <p>©codeit - 2024</p>
          </div>
          
          <div className={style.policyFAQ}>
            <a href="./privacy/">Privacy Policy</a>
            <a href="./faq/">FAQ</a>
          </div>

          <div className={style.link}>
            <a href="https://www.facebook.com" target="_blank">
              <img src="/assets/ic_facebook.png" alt="facebook"/>
            </a>
            <a href="https://www.twitter.com" target="_blank">
              <img src="/assets/ic_twitter.png" alt="twitter"/>
            </a>
            <a href="https://www.youtube.com" target="_blank">
              <img src="/assets/ic_youtube.png" alt="youtube"/>
            </a>
            <a href="https://www.instagram.com" target="_blank">
              <img src="/assets/ic_instagram.png" alt="instagram"/>
            </a>
          </div>

        </div>
    </footer>
  );
}

export default Footer;