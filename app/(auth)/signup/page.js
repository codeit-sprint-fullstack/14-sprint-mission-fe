"use client";

import IconGG from "@/public/ic_google.png";
import IconKT from "@/public/ic_kakaotalk.png";
import MainLogo from "@/public/logo_main_2x.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import PasswordInput from "@/app/components/PasswordInput";
import { signUp } from "@/app/lib/api/auth";
import { getErrorMessage } from "@/app/lib/error.js";
import {
  isValidEmail,
  isValidPassword,
  PASSWORD_MIN_LENGTH,
} from "@/app/lib/validation.js";
import styles from "./Signup.module.css";
import { useAuth } from "@/app/hooks/useAuth";

export default function Signup() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isPending } = useAuth();

  const [form, setForm] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    passwordConfirmation: false,
  });

  //뒷공백 실수 방지
  const cleanForm = {
    ...form,
    email: form.email.trim(),
    nickname: form.nickname.trim(),
  };

  const {
    mutate,
    isPending: isSubmitting,
    isSuccess,
    error,
    reset,
  } = useMutation({
    mutationFn: signUp,
    onSuccess: ({ accessToken, refreshToken, user: signedUser }) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      queryClient.setQueryData(["users", "me"], signedUser);
    },
  });

  useEffect(() => {
    if (user && !isSuccess) {
      router.replace("/items");
    }
  }, [user, router, isSuccess]);

  if (isPending || (user && !isSuccess)) {
    return <p>로딩중입니다...</p>;
  }

  const emailInvalid = !isValidEmail(cleanForm.email);
  const nicknameInvalid = cleanForm.nickname === "";
  const passwordInvalid = !isValidPassword(cleanForm.password);
  const passwordMismatch =
    cleanForm.password !== cleanForm.passwordConfirmation;

  const showEmailError = touched.email && form.email !== "" && emailInvalid;
  const showPasswordError =
    touched.password && form.password !== "" && passwordInvalid;
  const showPasswordConfirmationError =
    form.passwordConfirmation !== "" && passwordMismatch;

  const canSignUp =
    !emailInvalid &&
    !passwordInvalid &&
    !nicknameInvalid &&
    !passwordMismatch &&
    !isSubmitting;

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const cleanValue =
      name === "password" || name === "passwordConfirmation"
        ? value.replace(/\s/g, "")
        : value;
    setForm((prev) => ({ ...prev, [name]: cleanValue }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    mutate(cleanForm);
  }

  return (
    <>
      {error && <Modal message={getErrorMessage(error)} onConfirm={reset} />}
      {isSuccess && (
        <Modal
          message="가입 완료되었습니다."
          onConfirm={() => router.push("/items")}
        />
      )}
      <section className={styles.login}>
        <h1>
          <Link href="/">
            <Image src={MainLogo} alt="판다마켓" />
          </Link>
        </h1>
        <div className={styles.loginForm}>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="signup-email">이메일</label>
              <input
                type="email"
                name="email"
                id="signup-email"
                value={form.email}
                autoComplete="email"
                placeholder="이메일을 입력해주세요"
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={showEmailError}
                aria-describedby={showEmailError ? "email-error" : undefined}
                required
              />
              {showEmailError && (
                <p id="email-error" role="alert" className={styles.errorText}>
                  이메일 형식을 지켜주세요.
                </p>
              )}
            </div>
            <div>
              <label htmlFor="signup-nickname">닉네임</label>
              <input
                type="text"
                name="nickname"
                id="signup-nickname"
                value={form.nickname}
                placeholder="닉네임을 입력해주세요"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="signup-password">비밀번호</label>
              <PasswordInput
                name="password"
                id="signup-password"
                value={form.password}
                autoComplete="new-password"
                placeholder="비밀번호를 입력해주세요"
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={showPasswordError}
                aria-describedby={
                  showPasswordError ? "password-error" : undefined
                }
                required
              />
              {showPasswordError && (
                <p
                  id="password-error"
                  role="alert"
                  className={styles.errorText}
                >
                  비밀번호는 {PASSWORD_MIN_LENGTH}자 이상 입력해주세요.
                </p>
              )}
            </div>
            <div>
              <label htmlFor="signup-passwordConfirmation">비밀번호 확인</label>
              <PasswordInput
                name="passwordConfirmation"
                id="signup-passwordConfirmation"
                value={form.passwordConfirmation}
                autoComplete="new-password"
                placeholder="비밀번호를 다시 입력해주세요"
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={showPasswordConfirmationError}
                aria-describedby={
                  showPasswordConfirmationError
                    ? "passwordConfirmation-error"
                    : undefined
                }
                required
              />
              {showPasswordConfirmationError && (
                <p
                  id="passwordConfirmation-error"
                  role="alert"
                  className={styles.errorText}
                >
                  비밀번호가 일치하지 않아요.
                </p>
              )}
            </div>
            <button
              type="submit"
              className={styles.btLogin}
              aria-label="회원가입하기"
              disabled={!canSignUp}
            >
              {isSubmitting ? "가입 중입니다..." : "회원가입"}
            </button>
          </form>
          <div className={styles.socialLogin}>
            <p>간편 회원가입하기</p>
            <ul className={styles.socialLoginGroup}>
              <li>
                <a
                  href="https://www.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={IconGG} alt="구글가입" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.kakaocorp.com/page/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={IconKT} alt="카카오톡가입" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.signupFooter}>
          <p>
            이미 회원이신가요? <Link href="/signin">로그인</Link>
          </p>
        </div>
      </section>
    </>
  );
}
