import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
        <Link className="logo" to="/">
          <img src="/img/panda_logo.png" alt="판다마켓 로고" />
          <span>판다마켓</span>
        </Link>

        <label className="label" htmlFor="email">이메일</label>
        <input
          className={`input${emailError ? ' error' : ''}`}
          type="email"
          id="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailError(validateEmail(email))}
        />
        <span className={`error-msg${emailError ? ' visible' : ''}`}>{emailError}</span>

        <label className="label" htmlFor="password">비밀번호</label>
        <input
          className={`input${passwordError ? ' error' : ''}`}
          type="password"
          id="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setPasswordError(validatePassword(password))}
        />
        <span className={`error-msg${passwordError ? ' visible' : ''}`}>{passwordError}</span>

        <button className="login-btn" disabled={!isValid} onClick={handleLogin}>로그인</button>
        <div className="sns-box">
          <span>간편 로그인하기</span>
          <div className="icons">
            <a className="sns-icon google" href="https://www.google.com/" target="_blank" rel="noreferrer">
              <img src="/img/google_logo.png" alt="구글" style={{ width: 44, height: 44, borderRadius: '50%' }} />
            </a>
            <a className="sns-icon kakao" href="https://www.kakaocorp.com/page/" target="_blank" rel="noreferrer">
              <img src="/img/kakaotalk_logo.png" alt="카카오" style={{ width: 44, height: 44, borderRadius: '50%' }} />
            </a>
          </div>
        </div>

        <p className="signup-text">
          판다마켓이 처음이신가요? <Link to="/signup">회원가입</Link>
        </p>
      </div>

      {/* 에러 모달 */}
      {showModal && (
        <div className="modal show" onClick={(e) => { if (e.target.classList.contains('modal')) setShowModal(false); }}>
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button className="modal-btn" onClick={() => setShowModal(false)}>확인</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
