'use client';

import googleIcon from '@/assets/ic_google.png';
import kakaotalkIcon from '@/assets/ic_kakaotalk.png';
import logoIcon from '@/assets/ic_logo.png';
import visibleIcon from '@/assets/ic_visibility_on.png';
import invisibleIcon from '@/assets/ic_visibility_off.png';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { useState } from 'react';

export default function Singup() {
  const [pwdVisible, setPwdVisible] = useState(false);
  const [pwdConfVisible, setPwdConfVisible] = useState(false);

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
            type='email'
            id='email'
            name='email'
            placeholder='이메일을 입력해주세요'
          />
        </div>
        <div className={styles.section}>
          <label
            className={styles.label} 
            htmlFor='nickname'
          >
            닉네임
          </label>
          <input
            className={styles.input}
            type='text' 
            id='nickname'
            name='nickname'
            placeholder='닉네임을 입력해주세요'
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
              placeholder='비밀번호를 입력해주세요'
            />
            <button 
              className={styles.visibility}
              type='button'
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
        <div className={styles.section}>
          <label 
            className={styles.label}
            htmlFor='passwordConfirmation'
          >
            비밀번호 확인
          </label>
          <div className={styles.pwdInput}>
            <input 
              className={styles.input}
              type={pwdConfVisible ? 'text' : 'password'}
              id='passwordConfirmation'
              name='passwordConfirmation'
              placeholder='비밀번호를 다시 한 번 입력해주세요'
            />
            <button
              className={styles.visibility}
              type='button'
              onClick={() => setPwdConfVisible(!pwdConfVisible)}
            >
              <Image
                src={pwdConfVisible ? visibleIcon : invisibleIcon}
                width={24}
                height={24}
                alt='비밀번호 보기'
              />
            </button>
          </div>
        </div>
        <button className={styles.submitBtn}>
          회원가입
        </button>
      </form>

      <div className={styles.simpleLogin}>
        <p>
          간편 로그인하기
        </p>
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

      <div className={styles.login}>
        <p>이미 회원이신가요?</p>
        <Link href='/signin' className={styles.loginLink}>
          로그인
        </Link>
      </div>
      
    </div>
  )
}