import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

import Image from "next/image";
import Link from "next/link";

import EasyLogin from "@/components/EasyLogin";
import pandaMarketApi from "@/lib/api";

import styles from "@/styles/Signup.module.css";

export default function SignupPage() {
  // 비밀번호 표시 여부
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 비밀번호 확인 표시 여부
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);

  // 회원가입 실패 메시지
  const [signupErrorMessage, setSignupErrorMessage] = useState("");

  // 페이지 이동
  const router = useRouter();
  // 회원가입 페이지 접근 시 로그인 상태 확인
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      router.replace("/items");
    }
  }, [router]);

  // 회원가입 폼 관리
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  // 회원가입 폼 제출
  const handleSignup = (formData) => {
    signupMutation.mutate(formData);
  };

  // 회원가입 요청
  const signupMutation = useMutation({
    mutationFn: (formData) => {
      return pandaMarketApi.post("/auth/signUp", formData);
    },

    // 회원가입 성공
    onSuccess: (response) => {
      const accessToken = response.data.accessToken;

      localStorage.setItem("accessToken", accessToken);
      router.push("/items");
    },

    // 회원가입 실패
    onError: (error) => {
      const message = error.response?.data?.message;

      setSignupErrorMessage(
        message || "회원가입에 실패했습니다.",
      );
    },
  });

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <Link
          href="/"
          className={styles.logoLink}
          aria-label="판다마켓 홈으로 이동"
        >
          <Image
            src="/img/판다얼굴.png"
            alt="판다마켓 로고"
            width={104}
            height={104}
            className={styles.logoImage}
          />

          <h1 className={styles.logoText}>
            판다마켓
          </h1>
        </Link>

        {/* ============================================================================= */}
        {/* 회원가입 폼 */}
        {/* ============================================================================= */}
        <form
          className={styles.form}
          onSubmit={handleSubmit(handleSignup)}
        >
          <div className={styles.field}>
            <label
              htmlFor="signup-email"
              className={styles.label}
            >
              이메일
            </label>

            <input
              id="signup-email"
              type="email"
              className={styles.input}
              placeholder="이메일을 입력해주세요"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
            />
            {errors.email && (
              <p className={styles.errorMessage}>
                이메일을 확인해 주세요.
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label
              htmlFor="signup-nickname"
              className={styles.label}
            >
              닉네임
            </label>

            <input
              id="signup-nickname"
              type="text"
              className={styles.input}
              placeholder="닉네임을 입력해주세요"
              {...register("nickname", {
                required: true,
              })}
            />
            {errors.nickname && (
              <p className={styles.errorMessage}>
                닉네임을 입력해 주세요.
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label
              htmlFor="signup-password"
              className={styles.label}
            >
              비밀번호
            </label>

            <div className={styles.passwordBox}>
              <input
                id="signup-password"
                type={isPasswordVisible ? "text" : "password"}
                className={`${styles.input} ${styles.passwordInput}`}
                placeholder="비밀번호를 입력해주세요"
                {...register("password", {
                  required: true,
                  minLength: 8,
                })}
              />

              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => {
                  setIsPasswordVisible(
                    (previousVisible) => !previousVisible,
                  );
                }}
                aria-label={
                  isPasswordVisible
                    ? "비밀번호 숨기기"
                    : "비밀번호 보기"
                }
              >
                <Image
                  src={
                    isPasswordVisible
                      ? "/img/eye.png"
                      : "/img/eye_hidden.png"
                  }
                  alt=""
                  width={24}
                  height={24}
                  className={styles.passwordIcon}
                />
              </button>
            </div>
            {errors.password && (
              <p className={styles.errorMessage}>
                비밀번호를 확인해 주세요.
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label
              htmlFor="signup-password-confirmation"
              className={styles.label}
            >
              비밀번호 확인
            </label>

            <div className={styles.passwordBox}>
              <input
                id="signup-password-confirmation"
                type={
                  isPasswordConfirmationVisible
                    ? "text"
                    : "password"
                }
                className={`${styles.input} ${styles.passwordInput}`}
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                {...register("passwordConfirmation", {
                  required: true,
                  validate: (value) => value === watch("password"),
                })}
              />

              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => {
                  setIsPasswordConfirmationVisible(
                    (previousVisible) => !previousVisible,
                  );
                }}
                aria-label={
                  isPasswordConfirmationVisible
                    ? "비밀번호 확인 숨기기"
                    : "비밀번호 확인 보기"
                }
              >
                <Image
                  src={
                    isPasswordConfirmationVisible
                      ? "/img/eye.png"
                      : "/img/eye_hidden.png"
                  }
                  alt=""
                  width={24}
                  height={24}
                  className={styles.passwordIcon}
                />
              </button>
            </div>
            {errors.passwordConfirmation && (
              <p className={styles.errorMessage}>
                비밀번호가 일치하지 않아요.
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`${styles.submitButton} ${isValid ? styles.submitButtonActive : ""
              }`}
            disabled={!isValid}
          >
            회원가입
          </button>
        </form>

        <EasyLogin />

        <div className={styles.signinGuide}>
          <p className={styles.signinText}>
            이미 회원이신가요?
          </p>

          <Link
            href="/signin"
            className={styles.signinLink}
          >
            로그인
          </Link>
        </div>
      </section>
      {signupErrorMessage && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p className={styles.modalMessage}>
              {signupErrorMessage}
            </p>

            <button
              type="button"
              className={styles.modalButton}
              onClick={() => {
                setSignupErrorMessage("");
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </main>
  );
}