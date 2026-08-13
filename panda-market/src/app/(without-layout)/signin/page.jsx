'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { validateEmail, validatePassword } from '@/validators/authValidator'
import styles from './signinPage.module.css'

function SigninPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const canSignin =
    validateEmail(email.trim()).isValid &&
    validatePassword(password.trim()).isValid

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

    if (!passwordError) return

    const { message } = validatePassword(passwordInput.trim())
    setPasswordError(message)
  }

  function onPasswordBlur() {
    const { message } = validatePassword(password.trim())
    setPasswordError(message)
  }

  function onSigninSubmit(e) {
    e.preventDefault()

    const emailValidation = validateEmail(email.trim())
    const passwordValidation = validatePassword(password.trim())

    setEmailError(emailValidation.message)
    setPasswordError(passwordValidation.message)

    if (!emailValidation.isValid || !passwordValidation.isValid) return
  }

  return (
    <main className={styles.signinPage}>
      <div className={styles.container}>
        <header className={styles.authHeader}>
          <Link className={styles.pandaFace} href="/">
            <Image
              src="/logo.svg"
              alt="메인화면으로 이동"
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
            onSubmit={onSigninSubmit}
            noValidate
          >
            <div className={styles.labelInput}>
              <label htmlFor="signin-email">이메일</label>
              <input
                id="signin-email"
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
              <label htmlFor="signin-password">비밀번호</label>
              <div className={styles.passwordWrapper}>
                <input
                  id="signin-password"
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={onPasswordChange}
                  onBlur={onPasswordBlur}
                  className={passwordError ? styles.inputInvalid : ''}
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
            <button className={styles.signinButton} disabled={!canSignin}>
              로그인
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
          <div className={styles.signupSection}>
            <p className={styles.signupGuide}>판다마켓이 처음이신가요?</p>
            <Link className={styles.signupLink} href="/signup">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SigninPage
