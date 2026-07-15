import style from "../style/EasyLogin.module.css";
import google from "../assets/Google.png";
import kakao from "../assets/Kakao.png";

function EasyLogin() {

  return (
    <>
      <div className={style.easy_login}>
        <div className={style.outside_box}>
          <p>
            간편 로그인하기
          </p>
          <div id={style.component}>
            <a href="https://www.google.com/">
              <img src={google} alt="Google"/>
            </a>
            <a href="https://www.kakaocorp.com/page/">
              <img src={kakao} alt="Kakao"/>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default EasyLogin;