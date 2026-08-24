"use client";

import AlertModal from "@/components/AlertModal/AlertModal";
import Button from "@/components/Button/Button";
import useAuthMutation from "@/hooks/useAuthMutation";
import { signIn } from "@/lib/authApi";
import { useForm } from "react-hook-form";
import styles from "../AuthForm/AuthForm.module.css";
import AuthInput from "../AuthInput/AuthInput";
import PasswordInput from "../PasswordInput/PasswordInput";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const {
    mutation: signInMutation,
    errorMessage,
    clearError,
  } = useAuthMutation({
    mutationFn: ({ email, password }) => signIn(email, password),
    fallbackErrorMessage: "로그인에 실패했습니다.",
  });

  const handleSignIn = (data) => {
    signInMutation.mutate(data, {
      onError: () => {
        setError("email", {
          type: "server",
          message: "이메일을 확인해 주세요.",
        });

        setError("password", {
          type: "server",
          message: "비밀번호를 확인해 주세요.",
        });
      },
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleSignIn)}>
      <AuthInput
        label="이메일"
        id="signin-email"
        placeholder="이메일을 입력해 주세요."
        error={errors.email?.message}
        registration={register("email", {
          required: "이메일을 확인해 주세요.",
          pattern: {
            value: EMAIL_PATTERN,
            message: "잘못된 이메일입니다.",
          },
        })}
      />

      <PasswordInput
        label="비밀번호"
        id="signin-password"
        placeholder="비밀번호를 입력해 주세요."
        error={errors.password?.message}
        registration={register("password", {
          required: "비밀번호를 확인해 주세요.",
          minLength: {
            value: 8,
            message: "비밀번호를 8자 이상 입력해 주세요.",
          },
        })}
      />

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
        onClose={clearError}
      />
    </form>
  );
}
