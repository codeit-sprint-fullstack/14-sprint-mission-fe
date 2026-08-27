import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, useWatch } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EyeIcon, GoogleIcon, KakaoIcon } from "@/components/auth/AuthIcons";
import { signUp } from "@/lib/api/auth";
import { hasAccessToken, setAccessToken } from "@/lib/auth";
import { queryKeys } from "@/lib/queryKeys";
import styles from "../signin/SignInPage.module.css";

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_PATTERN = /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/;

function getSignUpErrorMessage(error) {
  const responseMessage = error.response?.data?.message;

  if (typeof responseMessage === "string" && responseMessage.trim()) {
    return responseMessage;
  }

  if (Array.isArray(responseMessage)) {
    const messages = responseMessage.filter(
      (message) => typeof message === "string" && message.trim(),
    );

    if (messages.length > 0) {
      return messages.join("\n");
    }
  }

  const responseError = error.response?.data?.error;

  if (typeof responseError === "string" && responseError.trim()) {
    return responseError;
  }

  return "회원가입에 실패했습니다.";
}

export default function SignUpPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [visiblePasswords, setVisiblePasswords] = useState({
    password: false,
    passwordConfirmation: false,
  });
  const [modalMessage, setModalMessage] = useState("");
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  useEffect(() => {
    if (hasAccessToken()) {
      router.replace("/items");
    }
  }, [router]);

  const password = useWatch({ control, name: "password" });

  useEffect(() => {
    if (getValues("passwordConfirmation")) {
      trigger("passwordConfirmation");
    }
  }, [password, getValues, trigger]);

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: queryKeys.me });
      setAccessToken(data.accessToken);
      setIsSignUpSuccess(true);
      setModalMessage("가입 완료되었습니다.");
    },
    onError: (error) => {
      setIsSignUpSuccess(false);
      setModalMessage(getSignUpErrorMessage(error));
    },
  });

  function togglePassword(field) {
    setVisiblePasswords((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  }

  function onSubmit(values) {
    signUpMutation.mutate(values);
  }

  function handleModalConfirm() {
    if (isSignUpSuccess) {
      router.replace("/items");
      return;
    }

    setModalMessage("");
  }

  return (
    <>
      <Head>
        <title>회원가입 | 판다마켓</title>
      </Head>

      <main className={`${styles.page} ${styles.signupPage}`}>
        <section className={styles.container}>
          <Link href="/" className={styles.logoLink} aria-label="판다마켓 홈">
            <Image
              className={styles.logo}
              src="/images/logo.png"
              alt="판다마켓"
              width={396}
              height={132}
              priority
            />
          </Link>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">이메일</label>
              <input
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요"
                aria-invalid={Boolean(errors.email)}
                {...register("email", {
                  required: "이메일을 입력해 주세요.",
                  pattern: {
                    value: EMAIL_PATTERN,
                    message: "잘못된 이메일입니다.",
                  },
                })}
              />
              {errors.email && <p className={styles.errorMessage} role="alert">{errors.email.message}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="nickname">닉네임</label>
              <input
                className={`${styles.input} ${errors.nickname ? styles.inputError : ""}`}
                id="nickname"
                type="text"
                placeholder="닉네임을 입력해주세요"
                aria-invalid={Boolean(errors.nickname)}
                {...register("nickname", {
                  required: "닉네임을 입력해 주세요.",
                  maxLength: {
                    value: 20,
                    message: "닉네임은 20자 이하로 입력해 주세요.",
                  },
                })}
              />
              {errors.nickname && <p className={styles.errorMessage} role="alert">{errors.nickname.message}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">비밀번호</label>
              <div className={styles.passwordInput}>
                <input
                  className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                  id="password"
                  type={visiblePasswords.password ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요"
                  aria-invalid={Boolean(errors.password)}
                  {...register("password", {
                    required: "비밀번호를 입력해 주세요.",
                    minLength: {
                      value: 8,
                      message: "비밀번호를 8자 이상 입력해 주세요.",
                    },
                    pattern: {
                      value: PASSWORD_PATTERN,
                      message: "영문, 숫자, 특수문자만 사용할 수 있습니다.",
                    },
                  })}
                />
                <button
                  className={styles.eyeButton}
                  type="button"
                  aria-label={visiblePasswords.password ? "비밀번호 숨기기" : "비밀번호 표시하기"}
                  onClick={() => togglePassword("password")}
                >
                  <EyeIcon visible={visiblePasswords.password} />
                </button>
              </div>
              {errors.password && <p className={styles.errorMessage} role="alert">{errors.password.message}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="passwordConfirmation">비밀번호 확인</label>
              <div className={styles.passwordInput}>
                <input
                  className={`${styles.input} ${errors.passwordConfirmation ? styles.inputError : ""}`}
                  id="passwordConfirmation"
                  type={visiblePasswords.passwordConfirmation ? "text" : "password"}
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  aria-invalid={Boolean(errors.passwordConfirmation)}
                  {...register("passwordConfirmation", {
                    required: "비밀번호를 다시 입력해 주세요.",
                    deps: ["password"],
                    validate: (value) =>
                      value === getValues("password") || "비밀번호가 일치하지 않아요.",
                  })}
                />
                <button
                  className={styles.eyeButton}
                  type="button"
                  aria-label={visiblePasswords.passwordConfirmation ? "비밀번호 확인 숨기기" : "비밀번호 확인 표시하기"}
                  onClick={() => togglePassword("passwordConfirmation")}
                >
                  <EyeIcon visible={visiblePasswords.passwordConfirmation} />
                </button>
              </div>
              {errors.passwordConfirmation && (
                <p className={styles.errorMessage} role="alert">{errors.passwordConfirmation.message}</p>
              )}
            </div>

            <button
              className={styles.submitButton}
              type="submit"
              disabled={!isValid || signUpMutation.isPending}
            >
              {signUpMutation.isPending ? "가입 중..." : "회원가입"}
            </button>
          </form>

          <div className={styles.socialBox}>
            <span>간편 로그인하기</span>
            <div className={styles.socialLinks}>
              <a href="https://www.google.com/" target="_blank" rel="noreferrer" aria-label="Google로 이동">
                <GoogleIcon />
              </a>
              <a href="https://www.kakaocorp.com/page" target="_blank" rel="noreferrer" aria-label="카카오로 이동">
                <KakaoIcon />
              </a>
            </div>
          </div>

          <p className={styles.signupPrompt}>
            이미 회원이신가요? <Link href="/signin">로그인</Link>
          </p>
        </section>
      </main>

      {modalMessage && (
        <div className={styles.modalBackdrop} role="presentation">
          <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="signup-error-title">
            <p id="signup-error-title">{modalMessage}</p>
            <button type="button" onClick={handleModalConfirm}>확인</button>
          </div>
        </div>
      )}
    </>
  );
}

SignUpPage.hideLayout = true;
