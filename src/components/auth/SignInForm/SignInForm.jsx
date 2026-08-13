"use client";

import AlertModal from "@/components/AlertModal/AlertModal";
import Button from "@/components/Button/Button";
import { signIn } from "@/lib/authApi";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./SignInForm.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const signInMutation = useMutation({
    mutationFn: ({ email, password }) => signIn(email, password),

    onSuccess: (response) => {
      localStorage.setItem("accessToken", response.accessToken);
      router.push("/items");
    },

    onError: (error) => {
      const message = error.response?.data?.message;

      setErrorMessage(
        typeof message === "string" ? message : "로그인에 실패했습니다.",
      );
    },
  });

  const handleSignIn = (data) => {
    signInMutation.mutate(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleSignIn)}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="signin-email">
          이메일
        </label>

        <input
          id="signin-email"
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          type="text"
          placeholder="이메일을 입력해 주세요."
          {...register("email", {
            required: "이메일을 확인해 주세요.",
            pattern: {
              value: EMAIL_PATTERN,
              message: "잘못된 이메일입니다.",
            },
          })}
        />

        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="signin-password">
          비밀번호
        </label>

        <div className={styles.passwordBox}>
          <input
            id="signin-password"
            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력해 주세요."
            {...register("password", {
              required: "비밀번호를 확인해 주세요.",
              minLength: {
                value: 8,
                message: "비밀번호를 8자 이상 입력해 주세요.",
              },
            })}
          />

          <button
            className={styles.eyeButton}
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            <Image
              src={
                showPassword
                  ? "/images/auth/btn_eye.png"
                  : "/images/auth/btn_eye_off.png"
              }
              alt=""
              width={24}
              height={24}
            />
          </button>
        </div>

        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={!isValid || signInMutation.isPending}
        className={styles.submitButton}
      >
        로그인
      </Button>

      <AlertModal
        isOpen={Boolean(errorMessage)}
        message={errorMessage}
        onClose={() => setErrorMessage("")}
      />
    </form>
  );
}
