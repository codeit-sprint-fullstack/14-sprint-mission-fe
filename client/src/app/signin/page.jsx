'use client';

import googleIcon from '@/assets/ic_google.png';
import kakaotalkIcon from '@/assets/ic_kakaotalk.png';
import logoIcon from '@/assets/ic_logo.png';
import visibleIcon from '@/assets/ic_visibility_on.png';
import invisibleIcon from '@/assets/ic_visibility_off.png';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './page.module.css';

export default function Login() {
  const [pwdVisible, setPwdVisible] = useState(false);
  
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Image
          src={logoIcon}
          width={103}
          height={103}
          alt=''
        />
        <h1 className={styles.title}>
          판다마켓
        </h1>
      </header>

      <form className={styles.form}>
        <div className={styles.section}>
          <label
            className={styles.label}
            htmlFor='email'
          >
            이메일
          </label>
          <input 
            className={styles.input}
            type='text' 
            id='email' 
            name='email' 
            placeholder='이메일을 입력해주세요' 
          />
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
              placeholder='닉네임을 입력해주세요'
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
        </div>
        <button className={styles.submitBtn}>
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
    </div>
  )
}