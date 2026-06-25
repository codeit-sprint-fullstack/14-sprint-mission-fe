import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import style from '../style/Login.module.css';
import visuablity from '../assets/btn_visibility_on_24px.png';
import google from '../assets/Google.png'
import kakao from '../assets/kakao.png'
import InputEmail from '../components/InputEmail.jsx';
import InputPwd from '../components/InputPwd.jsx';

function Login() {
  const [disabled, setDisabled] = useState(true); // 버튼 비활성화
  const [inital, setInital] = useState(true);

  useEffect(() => {
    console.log("로그인페이지");
    setDisabled(true);
  }, []);

  const buttonClick = () => {
    alert("로그인");
  }

  return (
    <main>
      <Logo className={style.Logo}/>
      
      <div className={style.container}>
        <div id={style.Email}>
          <h2>
            이메일
          </h2>
          <InputEmail/>
        </div>
        <div id={style.Password}>
          <h2>
            비밀번호
          </h2>
          <InputPwd/>
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
          <Link to = "/signup">
            회원가입
          </Link>
        </div>
      </div>
  </main>
  );
}

export default Login;