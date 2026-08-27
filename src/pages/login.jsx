import { useState, useEffect } from 'react'
import { useLogin } from '../hooks/useLogin.js';
import Link from 'next/link';
import Logo from '../components/logo.jsx';
import style from '@/styles/login.module.css';
import InputEmail from '../components/inputemail.jsx';
import InputPwd from '../components/inputpwd.jsx';
import LoginSignupButton from '../components/loginsignupbutton.jsx';
import EasyLogin from '../components/easylogin.jsx';
import Modal from '../components/modal.jsx';

function Login() {
  const loginMutation = useLogin();
  const [pwd, setPWD] = useState('');
  const [emailPass, setEmailPass] = useState(false);
  const [pwdPass, setPwdPass] = useState(false);
  const [disabled, setDisabled] = useState(true); // 버튼 비활성화
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    loginMutation.mutate(formData, {
      onError: (error) => {
        // 백엔드에서 내려주는 에러 메시지 확인
        const msg = error?.message
          || error?.details?.email?.message
          || "회원가입 중 오류가 발생했습니다.";
        setErrorMessage(msg); // ✅ 모달 열기
      }
    });
  }

  useEffect(() => {
    if (emailPass && pwdPass) {
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
        <form onSubmit={handleLogin} className={style.form}>
          <div id={style.Email}>
            <h2>
              이메일
            </h2>
            <InputEmail emailPass={setEmailPass} placeholder={`이메일을 입력해주세요`} type={'email'} name="email" />
          </div>
          <div id={style.Password}>
            <h2>
              비밀번호
            </h2>
            <InputPwd pwdPass={setPwdPass} placeholder={`비밀번호를 입력해주세요`} type={'password'} setPWD={setPWD} name="password" />
          </div>
          <LoginSignupButton disabled={disabled} message="로그인" />
        </form>
        <EasyLogin />
        <div id={style.first_login}>
          <p>
            판다마켓이 처음이신가요?
          </p>
          <Link href="/signup">
            회원가입
          </Link>
        </div>
      </div>
      {errorMessage && (
        <Modal
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </main>
  );
}

export default Login;