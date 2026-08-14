"use client";

import AlertModal from "@/components/AlertModal/AlertModal";
import Button from "@/components/Button/Button";
import useAuthMutation from "@/hooks/useAuthMutation";
import { signUp } from "@/lib/authApi";
import { useForm, useWatch } from "react-hook-form";
import styles from "../AuthForm/AuthForm.module.css";
import AuthInput from "../AuthInput/AuthInput";
import PasswordInput from "../PasswordInput/PasswordInput";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const password = useWatch({
    control,
    name: "password",
  });

  const {
    mutation: signUpMutation,
    errorMessage,
    clearError,
  } = useAuthMutation({
    mutationFn: ({ email, nickname, password, passwordConfirmation }) =>
      signUp(email, nickname, password, passwordConfirmation),
    fallbackErrorMessage: "회원가입에 실패했습니다.",
  });

  const handleSignUp = (data) => {
    signUpMutation.mutate(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleSignUp)}>
      <AuthInput
        label="이메일"
        id="signup-email"
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

      <AuthInput
        label="닉네임"
        id="signup-nickname"
        placeholder="닉네임을 입력해 주세요."
        error={errors.nickname?.message}
        registration={register("nickname", {
          required: "닉네임을 입력해 주세요.",
        })}
      />

      <PasswordInput
        label="비밀번호"
        id="signup-password"
        placeholder="비밀번호를 입력해 주세요."
        error={errors.password?.message}
        registration={register("password", {
          required: "비밀번호를 확인해 주세요.",
          minLength: {
            value: 8,
            message: "비밀번호를 8자 이상 입력해 주세요.",
          },
          deps: ["passwordConfirmation"],
        })}
      />

      <PasswordInput
        label="비밀번호 확인"
        id="signup-password-confirmation"
        placeholder="비밀번호를 한 번 더 입력해 주세요."
        error={errors.passwordConfirmation?.message}
        registration={register("passwordConfirmation", {
          required: "비밀번호를 확인해 주세요.",
          validate: (value) =>
            value === password || "비밀번호가 일치하지 않습니다.",
        })}
      />

      <Button
        type="submit"
        disabled={!isValid || signUpMutation.isPending}
        className={styles.submitButton}
      >
        회원가입
      </Button>

      <AlertModal
        isOpen={Boolean(errorMessage)}
        message={errorMessage}
        onClose={clearError}
      />
    </form>
  );
}
