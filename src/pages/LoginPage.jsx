import { useState } from 'react'
import './LoginPage.css'

import eyeImage from '../img/eye.png'

import AuthLogo from '../components/AuthLogo.jsx'
import EasyLogin from '../components/EasyLogin.jsx'

import { USER_DATA } from '../../UserData.js'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isEmailTouched, setIsEmailTouched] =
    useState(false)

  const [isPasswordTouched, setIsPasswordTouched] =
    useState(false)

  const [isPasswordVisible, setIsPasswordVisible] =
    useState(false)

  const [modalMessage, setModalMessage] =
    useState('')

  const emailPattern =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const emailValue = email.trim()
  const passwordValue = password.trim()

  const isEmailValid =
    emailPattern.test(emailValue)

  const isPasswordValid =
    passwordValue.length >= 8

  const isLoginFormValid =
    isEmailValid && isPasswordValid

  const isModalOpen =
    modalMessage !== ''

  let emailError = ''

  if (
    isEmailTouched &&
    emailValue === ''
  ) {
    emailError = '이메일을 입력해주세요.'
  } else if (
    isEmailTouched &&
    !isEmailValid
  ) {
    emailError = '잘못된 이메일 형식입니다.'
  }

  let passwordError = ''

  if (
    isPasswordTouched &&
    passwordValue === ''
  ) {
    passwordError = '비밀번호를 입력해주세요.'
  } else if (
    isPasswordTouched &&
    !isPasswordValid
  ) {
    passwordError =
      '비밀번호를 8자 이상 입력해주세요.'
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
    setIsPasswordVisible(
      (previousVisible) => !previousVisible,
    )
  }

  function handleLoginSubmit(event) {
    event.preventDefault()

    setIsEmailTouched(true)
    setIsPasswordTouched(true)

    if (!isLoginFormValid) {
      return
    }

    const matchedUser = USER_DATA.find(
      function (user) {
        return user.email === emailValue
      },
    )

    if (
      !matchedUser ||
      matchedUser.password !== passwordValue
    ) {
      setModalMessage(
        '비밀번호가 일치하지 않습니다.',
      )
      return
    }

    window.location.href = '/items'
  }

  function handleModalClose() {
    setModalMessage('')
  }

  return (
    <main className="login_page">
      <div className="login">
        <AuthLogo />

        <form
          className="login_form"
          onSubmit={handleLoginSubmit}
        >
          <div className="email_group">
            <label htmlFor="email_input">
              이메일
            </label>

            <input
              id="email_input"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
            />

            {emailError && (
              <p
                id="email_error"
                className="error_message"
              >
                {emailError}
              </p>
            )}
          </div>

          <div className="password_group">
            <label htmlFor="password_input">
              비밀번호
            </label>

            <div className="password_set">
              <input
                id="password_input"
                name="password"
                type={
                  isPasswordVisible
                    ? 'text'
                    : 'password'
                }
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
              />

              <button
                type="button"
                id="password_toggle"
                className="password_toggle"
                onClick={
                  handlePasswordVisibilityToggle
                }
                aria-pressed={isPasswordVisible}
                aria-label={
                  isPasswordVisible
                    ? '비밀번호 숨기기'
                    : '비밀번호 보기'
                }
              >
                <img
                  id="password_icon"
                  src={eyeImage}
                  alt=""
                />
              </button>
            </div>

            {passwordError && (
              <p
                id="password_error"
                className="error_message"
              >
                {passwordError}
              </p>
            )}
          </div>

          <div className="login_button_group">
            <button
              type="submit"
              className={
                isLoginFormValid
                  ? 'login_btn active'
                  : 'login_btn'
              }
              disabled={!isLoginFormValid}
            >
              로그인
            </button>
          </div>
        </form>

        <EasyLogin />

        <div className="First">
          <p className="text1">
            판다마켓이 처음이신가요?
          </p>

          <a href="/signup" className="signup">
            회원가입
          </a>
        </div>

        {isModalOpen && (
          <div
            id="error_modal"
            className="error_modal"
          >
            <div
              className="error_modal_content"
              role="dialog"
              aria-modal="true"
              aria-labelledby="error_modal_message"
            >
              <p id="error_modal_message">
                {modalMessage}
              </p>

              <button
                type="button"
                id="error_modal_close"
                className="error_modal_close"
                onClick={handleModalClose}
              >
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default LoginPage