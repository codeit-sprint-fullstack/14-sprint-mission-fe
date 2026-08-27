import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EyeIcon, GoogleIcon, KakaoIcon } from "@/components/auth/AuthIcons";
import { signIn } from "@/lib/api/auth";
import {
  hasAccessToken,
  setAccessToken,
} from "@/lib/auth";
import { queryKeys } from "@/lib/queryKeys";
import styles from "./SignInPage.module.css";

export default function SignInPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (hasAccessToken()) {
      router.replace("/items");
    }
  }, [router]);

  const signInMutation = useMutation({
    mutationFn: signIn,

    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: queryKeys.me });
      setAccessToken(data.accessToken);
      const destination =
        typeof router.query.redirect === "string"
          ? router.query.redirect
          : "/items";
      router.replace(destination);
    },

    onError: () => {
      setError("email", {
        type: "server",
        message: "이메일을 확인해 주세요.",
      });

      setError("password", {
        type: "server",
        message: "비밀번호를 확인해 주세요.",
      });

      setModalMessage("비밀번호가 일치하지 않습니다.");
    },
  });

  function onSubmit(values) {
    signInMutation.mutate(values);
  }

  return (
    <>
      <Head>
        <title>로그인 | 판다마켓</title>
      </Head>

      <main className={styles.page}>
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
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "잘못된 이메일입니다.",
                  },
                })}
              />

              {errors.email && (
                <p className={styles.errorMessage} role="alert">{errors.email.message}</p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">비밀번호</label>

              <div className={styles.passwordInput}>
                <input
                  className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요"
                  aria-invalid={Boolean(errors.password)}
                  {...register("password", {
                    required: "비밀번호를 입력해 주세요.",
                    minLength: {
                      value: 8,
                      message: "비밀번호를 8자 이상 입력해주세요.",
                    },
                  })}
                />

                <button
                  className={styles.eyeButton}
                  type="button"
                  aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시하기"}
                  onClick={() => setShowPassword((previous) => !previous)}
                >
                  <EyeIcon visible={showPassword} />
                </button>
              </div>

              {errors.password && (
                <p className={styles.errorMessage} role="alert">{errors.password.message}</p>
              )}
            </div>

            <button
              className={styles.submitButton}
              type="submit"
              disabled={!isValid || signInMutation.isPending}
            >
              {signInMutation.isPending ? "로그인 중..." : "로그인"}
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
            판다마켓이 처음이신가요? <Link href="/signup">회원가입</Link>
          </p>
        </section>
      </main>

      {modalMessage && (
        <div className={styles.modalBackdrop} role="presentation">
          <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="signin-error-title">
            <p id="signin-error-title">{modalMessage}</p>
            <button type="button" onClick={() => setModalMessage("")}>확인</button>
          </div>
        </div>
      )}
    </>
  );
}

SignInPage.hideLayout = true;
