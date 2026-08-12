import { useState, useEffect} from 'react'
import Link from 'next/link';
import Logo from '../components/logo.jsx';
import style from '@/styles/login.module.css';
import InputEmail from '../components/inputemail.jsx';
import InputPwd from '../components/inputpwd.jsx';
import LoginSignupButton from '../components/loginsignupbutton.jsx';
import EasyLogin from '../components/easylogin.jsx';

function Login() {
  const [pwd, setPWD] = useState('');
  const [emailPass, setEmailPass] = useState(false);
  const [pwdPass, setPwdPass] = useState(false);
  const [disabled, setDisabled] = useState(true); // 버튼 비활성화

  useEffect(() => {
    if(emailPass && pwdPass) {
      setDisabled(false);
    }
    else {
      setDisabled(true);
    }
  }, [pwdPass, emailPass]);

  return (
    <main className={style.main}>
      <Logo />
      <div className={style.container}>
        <div id={style.Email}>
          <h2>
            이메일
          </h2>
          <InputEmail emailPass={setEmailPass} placeholder={`이메일을 입력해주세요`} type={'email'}/>
        </div>
        <div id={style.Password}>
          <h2>
            비밀번호
          </h2>
          <InputPwd pwdPass={setPwdPass} placeholder={`비밀번호를 입력해주세요`} type={'password'} setPWD={setPWD}/>
        </div>
        <LoginSignupButton disabled={disabled}/>
        <EasyLogin/>
        <div id={style.first_login}>
          <p>
            판다마켓이 처음이신가요?
          </p>
          <Link href="/signup">
            회원가입
          </Link>
        </div>
      </div>
  </main>
  );
}

export default Login;