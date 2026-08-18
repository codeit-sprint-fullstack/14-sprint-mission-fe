'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import Link from 'next/link'
import { validateEmail, validatePassword } from '@/validators/authValidator'
import styles from './signinPage.module.css'

function SigninPage() {
  // register: input을 React Hook Form에 등록하고 값·이벤트·검증 규칙 연결
  // handleSubmit: preventDefault와 전체 유효성 검사
  // watch: React Hook Form이 관리 중인 현재 입력값을 구독해서 기존 버튼 활성화 조건을 보존하기 위해 사용
  // errors: emailError, passwordError를 대신하는 에러 객체
  // defaultValues: useState('')처럼 input의 최초값 설정
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    // 최초 Blur에서 검사하고 이후 입력 중 다시 검사
    mode: 'onTouched',
    // 기존 useState('')처럼 input의 최초값 설정
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const email = watch('email')
  const password = watch('password')

  const canSignin =
    validateEmail(email.trim()).isValid &&
    validatePassword(password.trim()).isValid

  function onSigninSubmit() {
    // 로그인 API 연결 단계에서 요청 로직 추가
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
            onSubmit={handleSubmit(onSigninSubmit)}
            noValidate
          >
            <div className={styles.labelInput}>
              <label htmlFor="signin-email">이메일</label>
              <input
                id="signin-email"
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
              <label htmlFor="signin-password">비밀번호</label>
              <div className={styles.passwordWrapper}>
                <input
                  id="signin-password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="비밀번호를 입력해주세요"
                  className={errors.password ? styles.inputInvalid : ''}
                  {...register('password', {
                    validate: (value) => {
                      const { isValid, message } = validatePassword(
                        value.trim(),
                      )
                      return isValid || message
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
            <button
              type="submit"
              className={styles.signinButton}
              disabled={!canSignin}
            >
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
