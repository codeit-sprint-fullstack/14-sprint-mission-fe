'use client';

import googleIcon from '@/assets/ic_google.png';
import kakaotalkIcon from '@/assets/ic_kakaotalk.png';
import logoIcon from '@/assets/ic_logo.png';
import invisibleIcon from '@/assets/ic_visibility_off.png';
import visibleIcon from '@/assets/ic_visibility_on.png';
import Modal from '@/components/Modal';
import { useLogin } from '@/queries/auth';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './page.module.css';

export default function Login() {
  const { register, handleSubmit, formState: { errors, isValid }, } = useForm({ mode: 'onChange' });
  const [pwdVisible, setPwdVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const queryClient = useQueryClient();
  const loginMutation = useLogin();
  const router = useRouter();

  // 로컬스토리지에 AT 있는 경우
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    // 중고마켓 페이지로 이동
    if (accessToken) {
      router.push('/products');
    }
  }, [router]);

  // useForm: e.preventDefault 자동으로 수행
  async function onSubmit(data) {
    loginMutation.mutate(data, {
      // 로그인 성공하면
      onSuccess: (resData) => {
        // 로컬스토리지에 AT, RT 저장
        localStorage.setItem('accessToken', resData.accessToken);
        localStorage.setItem('refreshToken', resData.refreshToken);
        // 캐시 무효화 
        // (mutate는 서버에 요청을 보낼 뿐, 관련 쿼리 캐시를 자동으로 갱신하지 않음)
        // (쿼리를 무효화해서 가장 최신의 데이터가 보이도록 함)
        queryClient.invalidateQueries({ queryKey: ['me'] });
        // 중고마켓 페이지로 이동
        router.push('/products');
      },
      // 실패하면
      onError: (err) => {
        // 모달 열기
        setModalMessage(err.response?.data?.message ?? '요청에 실패했습니다')
        setIsModalOpen(true);
      },
    });
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

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
            placeholder='이메일을 입력해주세요'
            {...register('email', {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '잘못된 이메일입니다'
              }
            })}
          />
          {errors.email && (
            <p className={styles.errorText}>
              {errors.email.message}
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
              placeholder='비밀번호를 입력해주세요'
              {...register('password', {
                required: true,
                minLength: {
                  value: 8,
                  message: '비밀번호를 8자 이상 입력해주세요'
                }
              })}
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
          {errors.password && (
              <p className={styles.errorText}>
                {errors.password.message}
              </p>
            )}
        </div>
        <button 
          className={styles.submitBtn} 
          disabled={!isValid || loginMutation.isPending}
        >
          {loginMutation.isPending ? '로그인 중...' : '로그인'}
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

      {isModalOpen && (
        <Modal
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}