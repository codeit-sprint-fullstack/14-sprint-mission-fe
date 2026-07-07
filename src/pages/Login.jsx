import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

import pandaFace from '../img/판다얼굴.png'
import eyeImage from '../img/eye.png'
import googleImage from '../img/google.png'
import kakaoImage from '../img/kakao.png'

import { USER_DATA } from '../../UserData.js'

function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isEmailTouched, setIsEmailTouched] = useState(false)
  const [isPasswordTouched, setIsPasswordTouched] = useState(false)

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const emailPattern =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const emailValue = email.trim()
  const passwordValue = password.trim()

  const isEmailValid = emailPattern.test(emailValue)
  const isPasswordValid = passwordValue.length >= 8
  const isLoginFormValid = isEmailValid && isPasswordValid

  const isModalOpen = modalMessage !== ''

  let emailError = ''

  if (isEmailTouched && emailValue === '') {
    emailError = '이메일을 입력해주세요.'
  } else if (isEmailTouched && !isEmailValid) {
    emailError = '잘못된 이메일 형식입니다.'
  }

  let passwordError = ''

  if (isPasswordTouched && passwordValue === '') {
    passwordError = '비밀번호를 입력해주세요.'
  } else if (isPasswordTouched && !isPasswordValid) {
    passwordError = '비밀번호를 8자 이상 입력해주세요.'
  }

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  function handleEmailBlur() {
    setIsEmailTouched(true)
  }

  function handlePasswordBlur() {
    setIsPasswordTouched(true)
  }

  function handlePasswordVisibilityToggle() {
    setIsPasswordVisible((previousVisible) => !previousVisible)
  }

  function handleLoginSubmit(event) {
    event.preventDefault()

    setIsEmailTouched(true)
    setIsPasswordTouched(true)

    if (!isLoginFormValid) {
      return
    }

    const matchedUser = USER_DATA.find((user) => {
      return user.email === emailValue
    })

    if (!matchedUser || matchedUser.password !== passwordValue) {
      setModalMessage('비밀번호가 일치하지 않습니다.')
      return
    }

    navigate('/')
  }

  function handleModalClose() {
    setModalMessage('')
  }

  return (
    <main className="login-page">
      <section className="login-page__container">
        <Link to="/" className="login-page__logo-link" aria-label="판다마켓 홈으로 이동">
          <img
            src={pandaFace}
            alt="판다마켓 로고"
            className="login-page__logo-image"
          />

          <h1 className="login-page__logo-text">
            판다마켓
          </h1>
        </Link>

        <form
          className="login-page__form"
          onSubmit={handleLoginSubmit}
        >
          <div className="login-page__field">
            <label
              htmlFor="login-email"
              className="login-page__label"
            >
              이메일
            </label>

            <input
              id="login-email"
              name="email"
              type="email"
              className="login-page__input"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
            />

            {emailError && (
              <p className="login-page__error">
                {emailError}
              </p>
            )}
          </div>

          <div className="login-page__field">
            <label
              htmlFor="login-password"
              className="login-page__label"
            >
              비밀번호
            </label>

            <div className="login-page__password-box">
              <input
                id="login-password"
                name="password"
                type={isPasswordVisible ? 'text' : 'password'}
                className="login-page__input login-page__password-input"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
              />

              <button
                type="button"
                className="login-page__password-toggle"
                onClick={handlePasswordVisibilityToggle}
                aria-label={
                  isPasswordVisible
                    ? '비밀번호 숨기기'
                    : '비밀번호 보기'
                }
              >
                <img
                  src={eyeImage}
                  alt=""
                  className="login-page__password-icon"
                />
              </button>
            </div>

            {passwordError && (
              <p className="login-page__error">
                {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={
              isLoginFormValid
                ? 'login-page__submit-button login-page__submit-button--active'
                : 'login-page__submit-button'
            }
            disabled={!isLoginFormValid}
          >
            로그인
          </button>
        </form>

        <div className="login-page__easy-login">
          <p className="login-page__easy-login-text">
            간편 로그인하기
          </p>

          <div className="login-page__easy-login-icons">
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noreferrer"
              className="login-page__easy-login-link"
              aria-label="구글로 로그인하기"
            >
              <img
                src={googleImage}
                alt="구글"
                className="login-page__easy-login-icon"
              />
            </a>

            <a
              href="https://www.kakaocorp.com/page/"
              target="_blank"
              rel="noreferrer"
              className="login-page__easy-login-link"
              aria-label="카카오로 로그인하기"
            >
              <img
                src={kakaoImage}
                alt="카카오"
                className="login-page__easy-login-icon"
              />
            </a>
          </div>
        </div>

        <div className="login-page__signup-guide">
          <p className="login-page__signup-text">
            판다마켓이 처음이신가요?
          </p>

          <Link
            to="/signup"
            className="login-page__signup-link"
          >
            회원가입
          </Link>
        </div>
      </section>

      {isModalOpen && (
        <div className="login-page__modal">
          <div
            className="login-page__modal-content"
            role="dialog"
            aria-modal="true"
          >
            <p className="login-page__modal-message">
              {modalMessage}
            </p>

            <button
              type="button"
              className="login-page__modal-close"
              onClick={handleModalClose}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default LoginPage