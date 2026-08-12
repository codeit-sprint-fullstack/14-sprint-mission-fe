'use client';

import googleIcon from '@/assets/ic_google.png';
import kakaotalkIcon from '@/assets/ic_kakaotalk.png';
import logoIcon from '@/assets/ic_logo.png';
import invisibleIcon from '@/assets/ic_visibility_off.png';
import visibleIcon from '@/assets/ic_visibility_on.png';
import ErrorModal from '@/components/modal/ErrorModal';
import axios from '@/lib/axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Login() {
  const [pwdVisible, setPwdVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorValue, setErrorValue] = useState({
    emailError: '',
    passwordError: '',
  });
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const router = useRouter();

  const isEmpty =
    email.trim() === '' ||
    password.trim() === '';

  const emailPattern = 
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // 로컬스토리지에 AT 있는 경우
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    // 중고마켓 페이지로 이동
    if (accessToken) {
      router.push('/products');
    }
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();

    // 1. 로그인 인풋 형식 검사
    const nextErros = {
      emailError: '',
      passwordError: '',
    }
    if (!emailPattern.test(email)) {
      nextErros.emailError = '잘못된 이메일입니다';
    }
    if (password.length < 8) {
      nextErros.passwordError = '비밀번호를 8자 이상 입력해주세요'
    }
    setErrorValue(nextErros);
    // 하나라도 오류가 있으면 API 요청 중단
    if (nextErros.emailError || nextErros.passwordError) {
      return;
    }

    // 2. 형식 검사를 통과한 경우, 로그인 API 요청
    try {
      const res = await axios.post('/auth/signIn', {
        email,
        password,
      })
      // 로그인 성공하면 AT, RT 로컬스토리지에 저장
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      // 중고마켓 페이지로 이동
      router.push('/products');
    } catch (err) {
      console.log(err.response?.data.message);
      // 실패한 경우, 모달 열기
      setModalMessage(err.response?.data?.message ?? '요청에 실패했습니다')
      setIsErrorModalOpen(true);
    }
  }
  
  return (
    <div className={styles.wrapper}>
      <Link href='/' className={styles.header}>
        <Image
          src={logoIcon}
          width={103}
          height={103}
          alt=''
        />
        <h1 className={styles.title}>
          판다마켓
        </h1>
      </Link>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <label
            className={styles.label}
            htmlFor='email'
          >
            이메일
          </label>
          <input 
            className={styles.input}
            type='email' 
            id='email' 
            name='email' 
            placeholder='이메일을 입력해주세요'
            onChange={(e) => setEmail(e.target.value)} 
          />
          {errorValue.emailError && (
            <p className={styles.errorText}>
              {errorValue.emailError}
            </p>
          )}
        </div>
        <div className={styles.section}>
          <label
            className={styles.label}
            htmlFor='password' 
          >
            비밀번호
          </label>
          <div className={styles.pwdInput}>
            <input 
              className={styles.input}
              type={pwdVisible ? 'text' : 'password'}
              id='password'
              name='password'
              placeholder='비밀번호를 입력해주세요'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type='button' 
              className={styles.visibility}
              onClick={() => setPwdVisible(!pwdVisible)}
            >
              <Image
                src={pwdVisible ? visibleIcon : invisibleIcon}
                width={24}
                height={24}
                alt='비밀번호 보기'
              />
            </button>
          </div>
          {errorValue.passwordError && (
              <p className={styles.errorText}>
                {errorValue.passwordError}
              </p>
            )}
        </div>
        <button 
          className={styles.submitBtn} 
          disabled={isEmpty}
        >
          로그인
        </button>
      </form>

      <div className={styles.simpleLogin}>
        <p>간편 로그인하기</p>
        <div className={styles.socials}>
          <Link href='https://www.google.com' target='_blank' rel='noopener noreferrer' >
            <Image
              src={googleIcon}
              width={42}
              height={42}
              alt='구글 로그인'
            />
          </Link>
          <Link href='https://www.kakaocorp.com/page' target='_blank' rel='noopener noreferrer'>
            <Image
              src={kakaotalkIcon}
              width={42}
              height={42}
              alt='카카오 로그인'
            />
          </Link>
        </div>
      </div>

      <div className={styles.signup}>
        <span>판다마켓이 처음이신가요?</span>
        <Link 
          href='/signup' 
          className={styles.signupLink}
        >
          회원가입
        </Link>
      </div>

      {isErrorModalOpen && (
        <ErrorModal
          message={modalMessage}
          onClose={() => setIsErrorModalOpen(false)}
        />
      )}
    </div>
  )
}