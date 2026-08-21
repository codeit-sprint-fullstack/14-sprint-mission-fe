"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordConfirmation,
} from "@/utils/validation";
import ErrorModal from "@/components/ErrorModal";
import styles from "./Signup.module.css";

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("잘못된 이메일 형식입니다.");
      return;
    }

    if (!validateNickname(nickname)) {
      setErrorMessage("닉네임을 입력해주세요.");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("비밀번호를 8자 이상 입력해주세요.");
      return;
    }

    if (!validatePasswordConfirmation(password, passwordConfirmation)) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signUp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, nickname }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "회원가입 실패");
      }

      router.push("/login");
    } catch (err) {
      setErrorMessage(err.message || "회원가입 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={styles.authContainer}>
      <div className={styles.logoHomeButtonWrapper}>
        <Link href="/">
          <Image
            src="/images/logo/logo.svg"
            alt="판다마켓 홈"
            width={396}
            height={100}
          />
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.inputItem}>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력해 주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputItem}>
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해 주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className={styles.inputItem}>
          <label htmlFor="password">비밀번호</label>
          <div className={styles.inputWrapper}>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className={styles.passwordToggleButton}
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <Image
                src={
                  showPassword
                    ? "/images/icons/eye-visible.svg"
                    : "/images/icons/eye-invisible.svg"
                }
                alt={
                  showPassword
                    ? "비밀번호 표시 상태 아이콘"
                    : "비밀번호 숨김 상태 아이콘"
                }
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
        <div className={styles.inputItem}>
          <label htmlFor="passwordConfirmation">비밀번호 확인</label>
          <div className={styles.inputWrapper}>
            <input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type={showPasswordConfirmation ? "text" : "password"}
              placeholder="비밀번호를 다시 한 번 입력해 주세요"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <button
              type="button"
              className={styles.passwordToggleButton}
              aria-label={
                showPasswordConfirmation ? "비밀번호 숨기기" : "비밀번호 보기"
              }
              onClick={() => setShowPasswordConfirmation((prev) => !prev)}
            >
              <Image
                src={
                  showPasswordConfirmation
                    ? "/images/icons/eye-visible.svg"
                    : "/images/icons/eye-invisible.svg"
                }
                alt={
                  showPasswordConfirmation
                    ? "비밀번호 표시 상태 아이콘"
                    : "비밀번호 숨김 상태 아이콘"
                }
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="button pill-button full-width"
          disabled={submitting}
        >
          {submitting ? "회원가입 중..." : "회원가입"}
        </button>
      </form>

      <div className={styles.socialLoginContainer}>
        <h3>간편 로그인하기</h3>
        <div className={styles.socialLoginButtonsContainer}>
          <a
            href="https://www.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="구글 로그인"
          >
            <Image
              src="/images/social/google-logo.png"
              alt="구글 로그인"
              width={42}
              height={42}
            />
          </a>

          <a
            href="https://www.kakaocorp.com/page/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="카카오톡 로그인"
          >
            <Image
              src="/images/social/kakao-logo.png"
              alt="카카오톡 로그인"
              width={42}
              height={42}
            />
          </a>
        </div>
      </div>

      <div className={styles.authSwitch}>
        이미 회원이신가요? <Link href="/login">로그인</Link>
      </div>

      <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")} />
    </main>
  );
}
