import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Web 캐시를 유지하기위한 Navigate 반영
import { useLocation } from "react-router-dom";
import Logo from "../assets/판다 얼굴.svg";
import "../reset.css";
import style from "./Items_Header.module.css";

function Items_Header() {
  const navigate = useNavigate(); // 링크 이동 시 새로고침이 아닌 상태로 컴포넌트 호출
  const location = useLocation(); // 주소를 통한 조건 설정용

  return (
    <header className={style.header}>
      <div className={style.logo_button}>
        <div className={style.logo_link}>
          <div className={style.logo}>
            <a href="/">
              <img src={Logo} alt="Logo"/>
              <h1 className={style.text}>판다마켓</h1>
            </a>
          </div>
          <div className={style.link}>
            <div className={style.link_text}>
              <a href="/notice" className={location.pathname === "/notice" ? style.active : ""}>자유게시판</a>
            </div>
            <div className={style.link_text}>
              <a href="/items" className={location.pathname === "/items" ? style.active : ""}>중고마켓</a>
            </div>
          </div>
        </div>

        <button
          type="button"
          className={style.loginButton}
          onClick={() => navigate('login/')}> 
          <span>로그인</span>
        </button>

      </div>
    </header>
  )
}

export default Items_Header;