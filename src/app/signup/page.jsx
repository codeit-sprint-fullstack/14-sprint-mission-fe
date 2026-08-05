'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLogo from '../../components/AuthLogo';
import AuthInput from '../../components/AuthInput';
import SnsLogin from '../../components/SnsLogin';
import Modal from '../../components/Modal';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  function validateEmail(value) {
    if (!value) return '이메일을 입력해주세요.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return '잘못된 이메일 형식입니다.';
    return '';
  }

  function validateNickname(value) {
    if (!value) return '닉네임을 입력해주세요.';
    return '';
  }

  function validatePassword(value) {
    if (!value) return '비밀번호를 입력해주세요.';
    if (value.length < 8) return '비밀번호를 8자 이상 입력해주세요.';
    return '';
  }

  function validatePasswordConfirm(value) {
    if (!value) return '비밀번호 확인을 입력해주세요.';
    if (value !== password) return '비밀번호가 일치하지 않습니다.';
    return '';
  }

  const isValid =
    !validateEmail(email) &&
    !validateNickname(nickname) &&
    !validatePassword(password) &&
    !validatePasswordConfirm(passwordConfirm);

  function handleSignup() {
    setModalMessage('회원가입이 완료되었습니다!');
    setShowModal(true);
    setTimeout(() => {
      router.push('/login');
    }, 1000);
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
          id="nickname"
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          error={nicknameError}
          onChange={(e) => setNickname(e.target.value)}
          onBlur={() => setNicknameError(validateNickname(nickname))}
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

        <AuthInput
          id="password-confirm"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          value={passwordConfirm}
          error={passwordConfirmError}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          onBlur={() => setPasswordConfirmError(validatePasswordConfirm(passwordConfirm))}
        />

        <button className="signup-btn" disabled={!isValid} onClick={handleSignup}>회원가입</button>

        <SnsLogin />

        <p className="login-text">
          이미 회원이신가요? <Link href="/login">로그인</Link>
        </p>
      </div>

      {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
    </>
  );
}
