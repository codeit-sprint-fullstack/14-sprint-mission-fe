'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import Link from 'next/link'
import {
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordConfirm,
} from '@/validators/authValidator'
import styles from './signupPage.module.css'

function SignupPage() {
  // getValues: 구독 없이 특정 input의 현재값을 가져옴
  // trigger: 지정한 input의 유효성 검사를 다시 실행
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
    },
  })

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false)

  const email = watch('email')
  const nickname = watch('nickname')
  const password = watch('password')
  const passwordConfirm = watch('passwordConfirm')

  const canSignup =
    validateEmail(email.trim()).isValid &&
    validateNickname(nickname.trim()).isValid &&
    validatePassword(password.trim()).isValid &&
    validatePasswordConfirm(password.trim(), passwordConfirm.trim()).isValid

  function onSignupSubmit() {
    // 회원가입 API 연결 단계에서 요청 로직 추가
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
            onSubmit={handleSubmit(onSignupSubmit)}
            noValidate
          >
            <div className={styles.labelInput}>
              <label htmlFor="signup-email">이메일</label>
              <input
                id="signup-email"
                type="email"
                placeholder="이메일을 입력해주세요"
                className={errors.email ? styles.inputInvalid : ''}
                {...register('email', {
                  validate: (value) => {
                    const { isValid, message } = validateEmail(value.trim())
                    return isValid || message
                  },
                })}
              />
              <div
                className={`${styles.inputError} ${errors.email ? styles.active : ''}`}
              >
                {errors.email?.message}
              </div>
            </div>
            <div className={styles.labelInput}>
              <label htmlFor="signup-nickname">닉네임</label>
              <input
                id="signup-nickname"
                type="text"
                placeholder="닉네임을 입력해주세요"
                className={errors.nickname ? styles.inputInvalid : ''}
                {...register('nickname', {
                  validate: (value) => {
                    const { isValid, message } = validateNickname(value.trim())
                    return isValid || message
                  },
                })}
              />
              <div
                className={`${styles.inputError} ${errors.nickname ? styles.active : ''}`}
              >
                {errors.nickname?.message}
              </div>
            </div>
            <div className={styles.labelInput}>
              <label htmlFor="signup-password">비밀번호</label>
              <div
                className={`${styles.passwordWrapper} ${errors.password ? styles.inputInvalid : ''}`}
              >
                <input
                  id="signup-password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="비밀번호를 입력해주세요"
                  {...register('password', {
                    validate: (value) => {
                      const { isValid, message } = validatePassword(
                        value.trim(),
                      )
                      return isValid || message
                    },
                    onChange: () => {
                      const passwordConfirmValue = getValues('passwordConfirm')

                      if (!passwordConfirmValue) return

                      trigger('passwordConfirm')
                    },
                  })}
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
                className={`${styles.inputError} ${errors.password ? styles.active : ''}`}
              >
                {errors.password?.message}
              </div>
            </div>
            <div className={styles.labelInput}>
              <label htmlFor="signup-password-confirm">비밀번호 확인</label>
              <div
                className={`${styles.passwordWrapper} ${errors.passwordConfirm ? styles.inputInvalid : ''}`}
              >
                <input
                  id="signup-password-confirm"
                  type={isPasswordConfirmVisible ? 'text' : 'password'}
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  {...register('passwordConfirm', {
                    validate: (value) => {
                      const passwordValue = getValues('password')
                      const { isValid, message } = validatePasswordConfirm(
                        passwordValue.trim(),
                        value.trim(),
                      )

                      return isValid || message
                    },
                  })}
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
                className={`${styles.inputError} ${errors.passwordConfirm ? styles.active : ''}`}
              >
                {errors.passwordConfirm?.message}
              </div>
            </div>
            <button
              type="submit"
              className={styles.signupButton}
              disabled={!canSignup}
            >
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
