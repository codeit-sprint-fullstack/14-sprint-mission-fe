import style from "./easylogin.module.css";

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
              <img src="/assets/Google.png" alt="Google"/>
            </a>
            <a href="https://www.kakaocorp.com/page/">
              <img src="/assets/Kakao.png" alt="Kakao"/>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default EasyLogin;