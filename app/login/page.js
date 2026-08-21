"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { validateEmail, validatePassword } from "@/utils/validation";
import ErrorModal from "@/components/ErrorModal";
import styles from "./Login.module.css";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("잘못된 이메일 형식입니다");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("비밀번호를 8자 이상 입력해주세요.");
      return;
    }

    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signIn`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!res.ok) throw new Error("로그인 실패");

      const data = await res.json();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/boards");
    } catch (err) {
      setErrorMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
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

        <button
          type="submit"
          className="button pill-button full-width"
          disabled={submitting}
        >
          {submitting ? "로그인 중..." : "로그인"}
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
        판다마켓이 처음이신가요? <Link href="/signup">회원가입</Link>
      </div>

      <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")} />
    </main>
  );
}
