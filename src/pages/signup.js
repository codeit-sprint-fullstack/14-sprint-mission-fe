import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Signin.module.css";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signUp } from "@/api/authApi";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const [emailError, setEmailError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");

  const [signupModalType, setSignupModalType] = useState("");

  const signupModalMessage =
    signupModalType === "success"
      ? "가입 완료되었습니다."
      : "사용 중인 이메일입니다.";

  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      router.replace("/items");
    }
  }, [router]);

  const signupMutation = useMutation({
    mutationFn: signUp,

    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      setSignupModalType("success");
    },

    onError: () => {
      setSignupModalType("emailInUse");
    },
  });

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isEmailValid = emailPattern.test(email.trim());
  const isPasswordValid = password.length >= 8;
  const isPasswordConfirmationValid = password === passwordConfirmation;

  const isFormValid =
    isEmailValid &&
    nickname.trim() !== "" &&
    isPasswordValid &&
    passwordConfirmation.trim() !== "" &&
    isPasswordConfirmationValid;

  function handleSubmit(event) {
    event.preventDefault();

    if (!isFormValid || signupMutation.isPending) {
      return;
    }

    setSignupModalType("");

    signupMutation.mutate({
      email,
      nickname,
      password,
      passwordConfirmation,
    });
  }

  function handleModalConfirm() {
    if (signupModalType === "success") {
      router.replace("/items");
      return;
    }

    setSignupModalType("");
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <div className={styles.logoArea}>
          <img className={styles.logo} src="/images/logo.png" alt="판다마켓" />
        </div>

        <form className={styles.authForm} onSubmit={handleSubmit} noValidate>
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
                } else if (!isEmailValid) {
                  setEmailError("잘못된 이메일입니다.");
                } else {
                  setEmailError("");
                }
              }}
            />
            <p className={styles.errorMessage}>{emailError}</p>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="nickname">닉네임</label>

            <input
              id="nickname"
              type="text"
              className={nicknameError ? styles.invalidInput : ""}
              placeholder="닉네임을 입력해주세요."
              value={nickname}
              onFocus={() => setNicknameError("")}
              onChange={(event) => {
                setNickname(event.target.value);
                setNicknameError("");
              }}
              onBlur={() => {
                if (nickname.trim() === "") {
                  setNicknameError("닉네임을 입력해 주세요.");
                } else {
                  setNicknameError("");
                }
              }}
            />
            <p className={styles.errorMessage}>{nicknameError}</p>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">비밀번호</label>

            <div className={styles.passwordBox}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={passwordError ? styles.invalidInput : ""}
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onFocus={() => setPasswordError("")}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setPasswordError("");
                }}
                onBlur={() => {
                  if (password.trim() === "") {
                    setPasswordError("비밀번호를 입력해주세요.");
                  } else if (!isPasswordValid) {
                    setPasswordError("비밀번호를 8자 이상 입력해주세요.");
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

          <div className={styles.inputGroup}>
            <label htmlFor="passwordConfirmation">비밀번호 확인</label>

            <div className={styles.passwordBox}>
              <input
                id="passwordConfirmation"
                type={showPasswordConfirmation ? "text" : "password"}
                className={passwordConfirmationError ? styles.invalidInput : ""}
                placeholder="비밀번호를 다시 한 번 입력해주세요."
                value={passwordConfirmation}
                onFocus={() => setPasswordConfirmationError("")}
                onChange={(event) => {
                  setPasswordConfirmation(event.target.value);
                  setPasswordConfirmationError("");
                }}
                onBlur={() => {
                  if (
                    passwordConfirmation.trim() === "" ||
                    password !== passwordConfirmation
                  ) {
                    setPasswordConfirmationError(
                      "비밀번호가 일치하지 않습니다.",
                    );
                  } else {
                    setPasswordConfirmationError("");
                  }
                }}
              />

              <button
                className={styles.eyeButton}
                type="button"
                aria-label={
                  showPasswordConfirmation
                    ? "비밀번호 확인 숨기기"
                    : "비밀번호 확인 보기"
                }
                onClick={() =>
                  setShowPasswordConfirmation((previous) => !previous)
                }
              >
                <img
                  src={
                    showPasswordConfirmation
                      ? "/images/password_eye_open.png"
                      : "/images/password_eye.svg"
                  }
                  alt=""
                />
              </button>
            </div>
            <p className={styles.errorMessage}>{passwordConfirmationError}</p>
          </div>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={!isFormValid || signupMutation.isPending}
          >
            회원가입
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
          이미 회원이신가요?
          <Link href="/signin">로그인</Link>
        </p>

        {signupModalType && (
          <div className={styles.modalBackground}>
            <div className={styles.modalBox}>
              <p className={styles.modalMessage}>{signupModalMessage}</p>

              <button
                className={styles.modalButton}
                type="button"
                onClick={handleModalConfirm}
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
