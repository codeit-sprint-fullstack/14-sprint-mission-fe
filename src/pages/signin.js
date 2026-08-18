import Link from "next/link";
import styles from "./Signin.module.css";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../api/authApi";
import { useRouter } from "next/router";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      router.replace("/items");
    }
  }, [router]);

  const loginMutation = useMutation({
    mutationFn: signIn,

    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      router.replace("/items");
    },
    onError: () => {
      setEmailError("이메일을 확인해 주세요.");
      setPasswordError("비밀번호를 확인해 주세요.");
      setLoginError("비밀번호가 일치하지 않습니다.");
    },
  });

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  function handleSubmit(event) {
    event.preventDefault();

    if (email.trim() === "") {
      setEmailError("이메일을 확인해 주세요.");
    } else {
      setEmailError("");
    }

    if (password.trim() === "") {
      setPasswordError("비밀번호를 확인해 주세요.");
    } else {
      setPasswordError("");
    }

    if (!isFormValid || loginMutation.isPending) {
      return;
    }

    loginMutation.mutate({
      email,
      password,
    });
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <Link className={styles.logoLink} href="/">
          <img className={styles.logo} src="/images/logo.png" alt="판다마켓" />
        </Link>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">이메일</label>

            <input
              id="email"
              type="email"
              className={emailError ? styles.invalidInput : ""}
              placeholder="이메일을 입력해주세요."
              value={email}
              onFocus={() => setEmailError("")}
              onChange={(event) => {
                setEmail(event.target.value);
                setEmailError("");
              }}
              onBlur={() => {
                if (email.trim() === "") {
                  setEmailError("이메일을 입력해 주세요.");
                } else {
                  setEmailError("");
                }
              }}
            />

            <p className={styles.errorMessage}>{emailError}</p>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">비밀번호</label>

            <div className={styles.passwordBox}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={passwordError ? styles.invalidInput : ""}
                placeholder="비밀번호를 입력해 주세요."
                value={password}
                onFocus={() => setPasswordError("")}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setPasswordError("");
                }}
                onBlur={() => {
                  if (password.trim() === "") {
                    setPasswordError("비밀번호를 입력해 주세요.");
                  } else {
                    setPasswordError("");
                  }
                }}
              />

              <button
                className={styles.eyeButton}
                type="button"
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                onClick={() => setShowPassword((previous) => !previous)}
              >
                <img
                  src={
                    showPassword
                      ? "/images/password_eye_open.png"
                      : "/images/password_eye.svg"
                  }
                  alt=""
                />
              </button>
            </div>

            <p className={styles.errorMessage}>{passwordError}</p>
          </div>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={!isFormValid || loginMutation.isPending}
          >
            {loginMutation.isPending ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className={styles.socialBox}>
          <p>간편 로그인하기</p>

          <div className={styles.socialIcons}>
            <a
              className={styles.googleButton}
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/ic_google.png" alt="구글 로그인" />
            </a>

            <a
              className={styles.kakaoButton}
              href="https://www.kakaocorp.com/page/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/ic_kakao.svg" alt="카카오 로그인" />
            </a>
          </div>
        </div>

        <p className={styles.bottomText}>
          판다마켓이 처음이신가요?
          <Link href="/signup">회원가입</Link>
        </p>

        {loginError && (
          <div className={styles.modalBackground}>
            <div className={styles.modalBox}>
              <p className={styles.modalMessage}>{loginError}</p>

              <button
                className={styles.modalButton}
                type="button"
                onClick={() => setLoginError("")}
              >
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
