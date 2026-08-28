"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/api/auth";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const isPasswordMismatch =
    passwordConfirmation !== "" && password !== passwordConfirmation;

  const isFormValid =
    email.trim() !== "" &&
    nickname.trim() !== "" &&
    password.trim() !== "" &&
    passwordConfirmation.trim() !== "" &&
    !isPasswordMismatch;

  const signupMutation = useMutation({
    mutationFn: signUp,

    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    },
  });

  const signupErrorMessage =
    signupMutation.error?.response?.data?.message ||
    "회원가입에 실패했습니다. 다시 시도해 주세요.";

  const isModalOpen = signupMutation.isSuccess || signupMutation.isError;

  const modalMessage = signupMutation.isSuccess
    ? "가입 완료되었습니다."
    : signupErrorMessage;

  function handleSubmit(event) {
    event.preventDefault();

    if (!isFormValid || signupMutation.isPending) {
      return;
    }

    signupMutation.mutate({ email, nickname, password, passwordConfirmation });
  }

  function handleModalConfirm() {
    if (signupMutation.isSuccess) {
      router.push("/items");
      return;
    }
    signupMutation.reset();
  }

  return (
    <main className={styles["container"]}>
      <div className={styles["login_area"]}>
        <Link href="index.html" className={styles["logo"]}>
          <Image
            src="/images/판다 얼굴.svg"
            alt="로고"
            width={103}
            height={103}
          />
          <span className={styles["panda-letters"]}>판다마켓</span>
        </Link>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className={styles["input-title"]}>
            이메일
          </label>
          <input
            className={styles["input-field"]}
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="nickname" className={styles["input-title"]}>
            닉네임
          </label>
          <input
            className={styles["input-field"]}
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            required
          />

          <label htmlFor="password" className={styles["input-title"]}>
            비밀번호
          </label>
          <div className={styles["password-visible"]}>
            <input
              className={styles["input-field"]}
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button type="button" className={styles["eye-button"]}>
              <Image
                src="/images/btn_visibility_on_24px.png"
                alt="비밀번호 보기"
                width={24}
                height={24}
              />
            </button>
          </div>
          <label htmlFor="password-check" className={styles["input-title"]}>
            비밀번호 확인
          </label>
          <div className={styles["password-visible"]}>
            <input
              className={styles["input-field"]}
              id="password-check"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              required
            />
            <button type="button" className={styles["eye-button"]}>
              <Image
                src="/images/btn_visibility_on_24px.png"
                alt="비밀번호 보기"
                width={24}
                height={24}
              />
            </button>
          </div>
          {isPasswordMismatch && (
            <p className={styles.errorMessage}>비밀번호가 일치하지 않아요.</p>
          )}

          <button
            type="submit"
            className={styles["loginButton"]}
            disabled={!isFormValid || signupMutation.isPending}
          >
            회원가입
          </button>
        </form>

        <div className={styles["simple_login"]}>
          <div className={styles["leftSimpleLogin"]}>
            <div>간편 로그인하기</div>
          </div>
          <div className={styles["rightSimpleLogin"]}>
            <Link href="https://www.google.com/">
              <Image
                src="/images/Component 2@3x.png"
                alt="구글"
                width={42}
                height={42}
              />
            </Link>
            <Link href="https://www.kakaocorp.com/page/">
              <Image
                src="/images/Component 3@3x.png"
                alt="카카오"
                width={42}
                height={42}
              />
            </Link>
          </div>
        </div>

        <div className={styles["signup"]}>
          이미 회원이신가요?
          <Link href="/signin">로그인</Link>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <p className={styles.modalMessage}>{modalMessage}</p>

            <button
              type="button"
              className={styles.modalButton}
              onClick={handleModalConfirm}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
