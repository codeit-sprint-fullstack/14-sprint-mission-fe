import { useState } from 'react'
import './Signup.css'

import eyeImage from '../img/eye.png'

import AuthLogo from '../components/AuthLogo.jsx'
import EasyLogin from '../components/EasyLogin.jsx'

import { USER_DATA } from '../../UserData.js'

function SignupPage() {
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const [isEmailTouched, setIsEmailTouched] =
    useState(false)

  const [isNicknameTouched, setIsNicknameTouched] =
    useState(false)

  const [isPasswordTouched, setIsPasswordTouched] =
    useState(false)

  const [
    isPasswordCheckTouched,
    setIsPasswordCheckTouched,
  ] = useState(false)

  const [isPasswordVisible, setIsPasswordVisible] =
    useState(false)

  const [
    isPasswordCheckVisible,
    setIsPasswordCheckVisible,
  ] = useState(false)

  const [modalMessage, setModalMessage] =
    useState('')

  const emailPattern =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const emailValue = email.trim()
  const nicknameValue = nickname.trim()

  const isEmailValid =
    emailPattern.test(emailValue)

  const isNicknameValid =
    nicknameValue !== ''

  const isPasswordValid =
    password.length >= 8

  const isPasswordCheckValid =
    passwordCheck !== '' &&
    password === passwordCheck

  const isSignupFormValid =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordCheckValid

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

  let nicknameError = ''

  if (
    isNicknameTouched &&
    nicknameValue === ''
  ) {
    nicknameError = '닉네임을 입력해주세요.'
  }

  let passwordError = ''

  if (
    isPasswordTouched &&
    password === ''
  ) {
    passwordError = '비밀번호를 입력해주세요.'
  } else if (
    isPasswordTouched &&
    !isPasswordValid
  ) {
    passwordError =
      '비밀번호를 8자 이상 입력해주세요.'
  }

  let passwordCheckError = ''

  if (
    isPasswordCheckTouched &&
    passwordCheck === ''
  ) {
    passwordCheckError =
      '비밀번호를 다시 입력해주세요.'
  } else if (
    isPasswordCheckTouched &&
    !isPasswordCheckValid
  ) {
    passwordCheckError =
      '비밀번호가 일치하지 않습니다.'
  }

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

  function handleNicknameChange(event) {
    setNickname(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  function handlePasswordCheckChange(event) {
    setPasswordCheck(event.target.value)
  }

  function handleEmailBlur() {
    setIsEmailTouched(true)
  }

  function handleNicknameBlur() {
    setIsNicknameTouched(true)
  }

  function handlePasswordBlur() {
    setIsPasswordTouched(true)
  }

  function handlePasswordCheckBlur() {
    setIsPasswordCheckTouched(true)
  }

  function handlePasswordVisibilityToggle() {
    setIsPasswordVisible(
      (previousVisible) => !previousVisible,
    )
  }

  function handlePasswordCheckVisibilityToggle() {
    setIsPasswordCheckVisible(
      (previousVisible) => !previousVisible,
    )
  }

  function handleSignupSubmit(event) {
    event.preventDefault()

    setIsEmailTouched(true)
    setIsNicknameTouched(true)
    setIsPasswordTouched(true)
    setIsPasswordCheckTouched(true)

    if (!isSignupFormValid) {
      return
    }

    const isEmailDuplicated = USER_DATA.some(
      function (user) {
        return user.email === emailValue
      },
    )

    if (isEmailDuplicated) {
      setModalMessage('사용 중인 이메일입니다')
      return
    }

    window.location.href = '/Login'
  }

  function handleModalClose() {
    setModalMessage('')
  }

  return (
    <main className="signup_page">
      <AuthLogo />

      <form
        className="signup_form"
        onSubmit={handleSignupSubmit}
      >
        <div className="email_group">
          <label htmlFor="email_input">
            이메일
          </label>

          <input
            id="email_input"
            className="input_field"
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

        <div className="nickname_group">
          <label htmlFor="nickname_input">
            닉네임
          </label>

          <input
            id="nickname_input"
            className="input_field"
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={handleNicknameChange}
            onBlur={handleNicknameBlur}
          />

          {nicknameError && (
            <p className="error_message">
              {nicknameError}
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

        <div className="password_check_group">
          <label htmlFor="password_check_input">
            비밀번호 확인
          </label>

          <div className="password_check_set">
            <input
              id="password_check_input"
              name="password_check"
              type={
                isPasswordCheckVisible
                  ? 'text'
                  : 'password'
              }
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              value={passwordCheck}
              onChange={
                handlePasswordCheckChange
              }
              onBlur={
                handlePasswordCheckBlur
              }
            />

            <button
              type="button"
              id="password_check_toggle"
              className="password_check_toggle"
              onClick={
                handlePasswordCheckVisibilityToggle
              }
              aria-pressed={
                isPasswordCheckVisible
              }
              aria-label={
                isPasswordCheckVisible
                  ? '비밀번호 확인 숨기기'
                  : '비밀번호 확인 보기'
              }
            >
              <img
                id="password_check_icon"
                src={eyeImage}
                alt=""
              />
            </button>
          </div>

          {passwordCheckError && (
            <p
              id="password_check_error"
              className="error_message"
            >
              {passwordCheckError}
            </p>
          )}
        </div>

        <div className="signup_button_group">
          <button
            type="submit"
            className={
              isSignupFormValid
                ? 'signup_btn active'
                : 'signup_btn'
            }
            disabled={!isSignupFormValid}
          >
            회원가입
          </button>
        </div>
      </form>

      <EasyLogin />

      <div className="First">
        <p className="text1">
          이미 회원이신가요?
        </p>

        <a href="/login" className="signup">
          로그인
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
    </main>
  )
}

export default SignupPage