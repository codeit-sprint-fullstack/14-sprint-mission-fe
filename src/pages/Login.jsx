import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLogo from '../components/AuthLogo';
import AuthInput from '../components/AuthInput';
import SnsLogin from '../components/SnsLogin';
import Modal from '../components/Modal';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  function validateEmail(value) {
    if (!value) return '이메일을 입력해주세요.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return '잘못된 이메일 형식입니다.';
    return '';
  }

  function validatePassword(value) {
    if (!value) return '비밀번호를 입력해주세요.';
    if (value.length < 8) return '비밀번호를 8자 이상 입력해주세요.';
    return '';
  }

  const isValid = !validateEmail(email) && !validatePassword(password);

  function handleLogin() {
    navigate('/items');
  }

  return (
    <>
      <div className="container">
        <AuthLogo />

        <AuthInput
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          error={emailError}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailError(validateEmail(email))}
        />

        <AuthInput
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          error={passwordError}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setPasswordError(validatePassword(password))}
        />

        <button className="login-btn" disabled={!isValid} onClick={handleLogin}>로그인</button>

        <SnsLogin />

        <p className="signup-text">
          판다마켓이 처음이신가요? <Link to="/signup">회원가입</Link>
        </p>
      </div>

      {/* 에러 모달 */}
      {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
    </>
  );
}

export default Login;
