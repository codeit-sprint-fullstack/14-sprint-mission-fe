import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import style from '../style/Login.module.css';
import visuablity from '../assets/btn_visibility_on_24px.png';
import google from '../assets/Google.png'
import kakao from '../assets/kakao.png'
import InputEmail from '../components/InputEmail.jsx';
import InputPwd from '../components/InputPwd.jsx';
import LoginSignupButton from '../components/LoginSignupButton.jsx';
import EasyLogin from '../components/EasyLogin.jsx';

function Login() {
  const [emailPass, setEmailPass] = useState(false);
  const [pwdPass, setPwdPass] = useState(false);
  const [disabled, setDisabled] = useState(true); // 버튼 비활성화
  const [inital, setInital] = useState(true);

  useEffect(() => {
    if(emailPass && pwdPass) {
      setDisabled(false);
    }
    else {
      setDisabled(true);
    }
  }, [pwdPass, emailPass]);

  const buttonClick = () => {
    alert("로그인");
  }

  return (
    <main>
      <Logo />
      <div className={style.container}>
        <div id={style.Email}>
          <h2>
            이메일
          </h2>
          <InputEmail emailPass={setEmailPass}/>
        </div>
        <div id={style.Password}>
          <h2>
            비밀번호
          </h2>
          <InputPwd pwdPass={setPwdPass} />
        </div>
        <LoginSignupButton disabled={disabled}/>
        <EasyLogin/>
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