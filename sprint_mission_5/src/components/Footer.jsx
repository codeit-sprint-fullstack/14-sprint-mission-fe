import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Web 캐시를 유지하기위한 Navigate 반영
import style from "./Footer.module.css";
import Instagram from "../assets/ic_instagram.png";
import Facebook from "../assets/ic_facebook.png";
import Twitter from "../assets/ic_twitter.png";
import Youtube from "../assets/ic_youtube.png";

function Footer() {
  return (
    <footer>
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
              <img src={Facebook} alt="facebook"/>
            </a>
            <a href="https://www.twitter.com" target="_blank">
              <img src={Twitter} alt="twitter"/>
            </a>
            <a href="https://www.youtube.com" target="_blank">
              <img src={Youtube} alt="youtube"/>
            </a>
            <a href="https://www.instagram.com" target="_blank">
              <img src={Instagram} alt="instagram"/>
            </a>
          </div>

        </div>
    </footer>
  );
}

export default Footer;