"use client";

import Modal from "@/app/components/Modal.jsx";
import PasswordInput from "@/app/components/PasswordInput.jsx";
import { getMe, signIn } from "@/app/lib/api/auth.js";
import { getErrorMessage } from "@/app/lib/error.js";
import IconGG from "@/public/ic_google.png";
import IconKT from "@/public/ic_kakaotalk.png";
import MainLogo from "@/public/logo_main_2x.png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  isValidEmail,
  isValidPassword,
  PASSWORD_MIN_LENGTH,
} from "../../lib/validation.js";
import styles from "./Signin.module.css";

export default function Signin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const { data: user, isPending } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => getMe(),
    retry: false,
  });
  const {
    mutate,
    isPending: isSubmitting,
    error,
    reset,
  } = useMutation({
    mutationFn: signIn,
    onSuccess: ({ accessToken, user: signedUser }) => {
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      queryClient.setQueryData(["users", "me"], signedUser);
    },
  });

  useEffect(() => {
    if (user) {
      router.replace("/items");
    }
  }, [user, router]);

  if (isPending || user) {
    return <p>로딩중입니다...</p>;
  }

  const emailInvalid = !isValidEmail(form.email);
  const passwordInvalid = !isValidPassword(form.password);

  const showEmailError = touched.email && form.email !== "" && emailInvalid;
  const showPasswordError =
    touched.password && form.password !== "" && passwordInvalid;

  const canSignIn = !emailInvalid && !passwordInvalid && !isSubmitting;

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
    const trimmedForm = {
      ...form,
      email: form.email.trim(),
    };
    mutate(trimmedForm);
  }

  return (
    <>
      {error && <Modal message={getErrorMessage(error)} onConfirm={reset} />}
      <section className={styles.login}>
        <h1>
          <Link href="/">
            <Image src={MainLogo} alt="판다마켓" />
          </Link>
        </h1>
        <div className={styles.loginForm}>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="login-email">이메일</label>
              <input
                type="email"
                name="email"
                id="login-email"
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
              <label htmlFor="login-password">비밀번호</label>
              <PasswordInput
                name="password"
                id="login-password"
                value={form.password}
                autoComplete="current-password"
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
            <button
              type="submit"
              className={styles.btLogin}
              aria-label="로그인하기"
              disabled={!canSignIn}
            >
              {isSubmitting ? "로그인 중입니다..." : "로그인"}
            </button>
          </form>
          <div className={styles.socialLogin}>
            <p>간편 로그인하기</p>
            <ul className={styles.socialLoginGroup}>
              <li>
                <a
                  href="https://www.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={IconGG} alt="구글로그인" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.kakaocorp.com/page/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={IconKT} alt="카카오톡로그인" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.signupFooter}>
          <p>
            판다마켓이 처음이신가요? <Link href="/signup">회원가입</Link>
          </p>
        </div>
      </section>
    </>
  );
}
