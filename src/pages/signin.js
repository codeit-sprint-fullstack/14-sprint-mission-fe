import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

import Image from "next/image";
import Link from "next/link";
import pandaMarketApi from "@/lib/api";
import EasyLogin from "@/components/EasyLogin";

import styles from "@/styles/Signin.module.css";

export default function SigninPage() {
  // 비밀번호 표시 여부
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 로그인 실패 메시지
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  // 페이지 이동
  const router = useRouter();

  // 로그인 상태 확인
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      router.replace("/items");
    }
  }, [router]);

  // 로그인 폼 관리
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  // 로그인 폼 제출
  const onSubmit = (data) => {
    signinMutation.mutate(data);
  };

  // 로그인 요청
  const signinMutation = useMutation({
    mutationFn: (data) => {
      return pandaMarketApi.post("/auth/signIn", data);
    },

    // 로그인 성공
    onSuccess: (response) => {
      const accessToken = response.data.accessToken;

      localStorage.setItem("accessToken", accessToken);
      router.push("/items");
    },

    onError: (error) => {
      const details = error.response?.data?.details;
      const message = error.response?.data?.message;

      if (details?.email) {
        setError("email", {
          type: "server",
          message: "이메일을 확인해 주세요.",
        });
      }

      if (details?.password) {
        setError("password", {
          type: "server",
          message: "비밀번호를 확인해 주세요.",
        });
      }

      setLoginErrorMessage(message || "로그인에 실패했습니다.");
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

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <label
              htmlFor="signin-email"
              className={styles.label}
            >
              이메일
            </label>

            <input
              id="signin-email"
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
                {errors.email.message || "이메일을 확인해 주세요."}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label
              htmlFor="signin-password"
              className={styles.label}
            >
              비밀번호
            </label>
            <div className={styles.passwordBox}>
              <input
                id="signin-password"
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
                {errors.password.message || "비밀번호를 확인해 주세요."}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`${styles.submitButton} ${isValid ? styles.submitButtonActive : ""
              }`}
            disabled={!isValid}
          >
            로그인
          </button>
        </form>

        <EasyLogin />

        <div className={styles.signupGuide}>
          <p className={styles.signupText}>
            판다마켓이 처음이신가요?
          </p>

          <Link
            href="/signup"
            className={styles.signupLink}
          >
            회원가입
          </Link>
        </div>
      </section>

      {loginErrorMessage && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p className={styles.modalMessage}>
              {loginErrorMessage}
            </p>

            <button
              type="button"
              className={styles.modalButton}
              onClick={() => {
                setLoginErrorMessage("");
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