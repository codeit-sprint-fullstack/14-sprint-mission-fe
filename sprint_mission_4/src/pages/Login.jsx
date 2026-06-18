import { useState, useEffect } from 'react'
import Logo from '../assets/판다 얼굴.svg';
import style from './Login.module.css';
import visuablity from '../assets/btn_visibility_on_24px.png';
import google from '../assets/Google.png'
import kakao from '../assets/kakao.png'

function Login() {
  const [disabled, setDisabled] = useState(true); // 버튼 비활성화
  const [inital, setInital] = useState(true);

  useEffect(() => {
    console.log("로그인페이지");
    setDisabled(true);
  }, []);

  function emailCheck(email){ // 유효성 검사
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9._-]{2,4}$/i; // mail 주소 [a-zA-Z0-9._-] , @ 필수, 도메인 주소 [a-zA-Z0-9.-], . 필수, com, net, co.kr 부분[a-zA-Z0-9.-]
    return email_regex.test(email);
  }


  const buttonClick = () => {
    alert("로그인");
  }

  return (
    <main>
      <a href="../" id={style.Logo}>
        <img src={Logo} alt="Logo"/>
        <h1>판다마켓</h1>
      </a>
      
      <div className={style.container}>
        <div id={style.Email}>
          <h2>
            이메일
          </h2>
          <input
            onBlur={() => {
              console.log("포커스아웃");

            }}
            type="text"
            className={`${style.text_section} default`}
            id="email_adress"
            placeholder="이메일을 입력해주세요"
          />
          <div className={`${style.failure_message} ${style.hidden}`} id="none_email">
            이메일을 입력해주세요.
          </div>
          <div className={`${style.failure_message} ${style.hidden}`} id="wrong_rule">
            잘못된 이메일 형식입니다.
          </div>
        </div>
        <div id={style.Password}>
          <h2>
            비밀번호
          </h2>
          <div className={style.show_word}>
            <input type="password" id={style.Password_text} className="default" placeholder="비밀번호를 입력해주세요"/>
            <img src={visuablity}/>
          </div>
          <div className={`${style.failure_message} ${style.hidden}`} id="none_password">
              비밀번호를 입력해주세요.
          </div>
          <div className={`${style.failure_message} ${style.hidden}`} id="wrong_rule_password">
              비밀번호를 8자 이상 입력해주세요.
          </div>
        </div>
        <button disabled={disabled} id={style.loginButton} onClick={buttonClick}>
          로그인
        </button>
        <div id={style.easy_login}>
          <div id={style.outside_box}>
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
        <div id={style.first_login}>
          <p>
            판다마켓이 처음이신가요?
          </p>
          <a href="../signup/">
            회원가입
          </a>
        </div>
      </div>
  </main>
  );
}

export default Login;