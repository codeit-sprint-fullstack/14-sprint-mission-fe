import { useState, useEffect, use } from 'react'
import { Link } from 'react-router-dom';
import Logo from '../components/Logo.jsx'
import style from '../style/Signup.module.css';
import visuablity from '../assets/btn_visibility_on_24px.png';
import google from '../assets/Google.png'
import kakao from '../assets/kakao.png'
import InputEmail from '../components/InputEmail.jsx';
import InputPwd from '../components/InputPwd.jsx';
import LoginSignupButton from '../components/LoginSignupButton.jsx';
import EasyLogin from '../components/EasyLogin.jsx';

function Signup() {
  const [emailPass, setEmailPass] = useState(false);
  const [nicknamePass, setNicknamePass] = useState(false);
  const [pwdPass, setPwdPass] = useState(false);
  const [checkPwdPass, setCheckPwdPass] = useState(false);

  const [pwd, setPwd] = useState(""); 
  const [disabled, setDisabled] = useState(true); // 버튼 비활성화

  useEffect(() => {
    if(emailPass && pwdPass && nicknamePass && checkPwdPass) {
      setDisabled(false);
    }
    else {
      setDisabled(true);
    }
  }, [emailPass, nicknamePass, pwdPass, checkPwdPass]);

  return (
    <main>

      <Logo />
      
      <div className={style.container}>
        <div className={style.Info}>
          <h2>
            이메일
          </h2>
          <InputEmail emailPass={setEmailPass} placeholder={`이메일을 입력해주세요`} type={`email`}/>
        </div>
        
        <div className={style.Info}>
          <h2>
            닉네임
          </h2>
          <InputEmail emailPass={setNicknamePass} placeholder={`닉네임을 입력해주세요`} type={'nickname'}/>
        </div>

        <div className={style.Info}>
          <h2>
            비밀번호
          </h2>
          <InputPwd pwdPass={setPwdPass} placeholder={`비밀번호를 입력해주세요`} type={`password`} setPWD={setPwd}/>
        </div>

        <div className={style.Info}>
          <h2>
            비밀번호 확인
          </h2>
          <InputPwd pwdPass={setCheckPwdPass} placeholder={`비밀번호를 다시 입력해주세요`} type={`passwordCheck`} originalPwd={pwd}/>
        </div>

        <LoginSignupButton disabled={disabled}/>

        <EasyLogin/>


        <div id={style.haveAccount}>
          <p>
            판다마켓이 계정이 있으신가요?
          </p>
          <Link to = "/login">
            로그인
          </Link>
        </div>
      </div>
  </main>
  );
}

export default Signup;