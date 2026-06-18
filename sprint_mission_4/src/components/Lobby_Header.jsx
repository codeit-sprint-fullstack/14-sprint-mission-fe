import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Web 캐시를 유지하기위한 Navigate 반영
import Logo from "../assets/판다 얼굴.svg";
import "../reset.css";
import style from "./Lobby_Header.module.css";

function Header() {
  const navigate = useNavigate(); // 링크 이동 시 새로고침이 아닌 상태로 컴포넌트 호출

  return (
    <header className={style.header}>
      <div className={style.logo_button}>
        <div className={style.logo}>
          <a href="/">
            <img src={Logo} alt="Logo"/>
          </a>
          <h1 className={style.text}>판다마켓</h1>
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

export default Header;