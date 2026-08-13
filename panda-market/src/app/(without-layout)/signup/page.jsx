'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from '@/validators/authValidator'
import styles from './signupPage.module.css'

function SignupPage() {
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordConfirmError, setPasswordConfirmError] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false)

  const canSignup =
    validateEmail(email.trim()).isValid &&
    nickname.trim() !== '' &&
    validatePassword(password.trim()).isValid &&
    validatePasswordConfirm(password.trim(), passwordConfirm.trim()).isValid

  function onEmailChange(e) {
    const emailInput = e.target.value
    setEmail(emailInput)

    if (!emailError) return

    const { message } = validateEmail(emailInput.trim())
    setEmailError(message)
  }

  function onEmailBlur() {
    const { message } = validateEmail(email.trim())
    setEmailError(message)
  }

  function onPasswordChange(e) {
    const passwordInput = e.target.value
    setPassword(passwordInput)

    if (passwordError) {
      const { message } = validatePassword(passwordInput.trim())
      setPasswordError(message)
    }

    // 비밀번호 변경 후 기존 비밀번호 확인과 재비교
    if (passwordConfirm) {
      const { message } = validatePasswordConfirm(
        passwordInput.trim(),
        passwordConfirm.trim(),
      )
      setPasswordConfirmError(message)
    }
  }

  function onPasswordBlur() {
    const { message } = validatePassword(password.trim())
    setPasswordError(message)
  }

  function onPasswordConfirmChange(e) {
    const passwordConfirmInput = e.target.value
    setPasswordConfirm(passwordConfirmInput)

    if (!passwordConfirmError) return

    const { message } = validatePasswordConfirm(
      password.trim(),
      passwordConfirmInput.trim(),
    )
    setPasswordConfirmError(message)
  }

  function onPasswordConfirmBlur() {
    const { message } = validatePasswordConfirm(
      password.trim(),
      passwordConfirm.trim(),
    )
    setPasswordConfirmError(message)
  }

  function onSignupSubmit(e) {
    e.preventDefault()

    const emailValidation = validateEmail(email.trim())
    const passwordValidation = validatePassword(password.trim())
    const passwordConfirmValidation = validatePasswordConfirm(
      password.trim(),
      passwordConfirm.trim(),
    )

    setEmailError(emailValidation.message)
    setPasswordError(passwordValidation.message)
    setPasswordConfirmError(passwordConfirmValidation.message)

    if (
      !emailValidation.isValid ||
      !passwordValidation.isValid ||
      !passwordConfirmValidation.isValid
    )
      return
  }

  return (
    <main className={styles.signupPage}>
      <div className={styles.container}>
        <header className={styles.authHeader}>
          <Link className={styles.pandaFace} href="/">
            <Image
              src="/logo.svg"
              alt="판다마켓 로고"
              width={104}
              height={104}
            />
          </Link>
          <Link className={styles.pandaFaceLogo} href="/">
            판다마켓
          </Link>
        </header>
        <div>
          {/* noValidate: 브라우저의 기본 HTML 검증 UI 비활성화 */}
          <form
            className={styles.authForm}
            onSubmit={onSignupSubmit}
            noValidate
          >
            <div className={styles.labelInput}>
              <label htmlFor="signup-email">이메일</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={onEmailChange}
                onBlur={onEmailBlur}
                className={emailError ? styles.inputInvalid : ''}
              />
              <div
                className={`${styles.inputError} ${emailError ? styles.active : ''}`}
              >
                {emailError}
              </div>
            </div>
            <div className={styles.labelInput}>
              <label htmlFor="signup-nickname">닉네임</label>
              <input
                id="signup-nickname"
                name="nickname"
                type="text"
                placeholder="닉네임을 입력해주세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div className={styles.labelInput}>
              <label htmlFor="signup-password">비밀번호</label>
              <div
                className={`${styles.passwordWrapper} ${passwordError ? styles.inputInvalid : ''}`}
              >
                <input
                  id="signup-password"
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={onPasswordChange}
                  onBlur={onPasswordBlur}
                />
                <button
                  type="button"
                  className={styles.passwordToggleButton}
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                >
                  <Image
                    src={
                      isPasswordVisible
                        ? '/btn_visibility_on_24px.svg'
                        : '/btn_visibility_off_24px.svg'
                    }
                    alt="비밀번호 표시"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              <div
                className={`${styles.inputError} ${passwordError ? styles.active : ''}`}
              >
                {passwordError}
              </div>
            </div>
            <div className={styles.labelInput}>
              <label htmlFor="signup-password-confirm">비밀번호 확인</label>
              <div
                className={`${styles.passwordWrapper} ${passwordConfirmError ? styles.inputInvalid : ''}`}
              >
                <input
                  id="signup-password-confirm"
                  name="password_confirm"
                  type={isPasswordConfirmVisible ? 'text' : 'password'}
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  value={passwordConfirm}
                  onChange={onPasswordConfirmChange}
                  onBlur={onPasswordConfirmBlur}
                />
                <button
                  type="button"
                  className={styles.passwordToggleButton}
                  onClick={() => setIsPasswordConfirmVisible((prev) => !prev)}
                >
                  <Image
                    src={
                      isPasswordConfirmVisible
                        ? '/btn_visibility_on_24px.svg'
                        : '/btn_visibility_off_24px.svg'
                    }
                    alt="비밀번호 표시"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              <div
                className={`${styles.inputError} ${passwordConfirmError ? styles.active : ''}`}
              >
                {passwordConfirmError}
              </div>
            </div>
            <button className={styles.signupButton} disabled={!canSignup}>
              회원가입
            </button>
          </form>
          <div className={styles.socialLoginSection}>
            <p>간편 로그인하기</p>
            <div className={styles.socialLogin}>
              <a
                href="https://www.google.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/ic_google.svg"
                  width={42}
                  height={42}
                  alt="login-with-google"
                />
              </a>
              <a
                href="https://www.kakaocorp.com/page/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/ic_kakaoTalk.svg"
                  width={42}
                  height={42}
                  alt="login-with-kakaotalk"
                />
              </a>
            </div>
          </div>
          <div className={styles.loginSection}>
            <p className={styles.loginGuide}>이미 회원이신가요?</p>
            <Link className={styles.loginLink} href="/signin">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignupPage
