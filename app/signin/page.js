"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/api/auth";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const loginMutation = useMutation({
    mutationFn: signIn,

    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      router.push("/items");
    },
  });

  function handleSubmit(event) {
    event.preventDefault();

    if (!isFormValid || loginMutation.isPending) {
      return;
    }
    loginMutation.mutate({ email, password });
  }

  return (
    <main className={styles.container}>
      <div className={styles["login_area"]}>
        <Link href="index.html" className={styles["logo"]}>
          <Image
            src="images/판다 얼굴.svg"
            alt="로고"
            width={103}
            height={103}
          />
          <span className={styles["panda-letters"]}>판다마켓</span>
        </Link>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className={styles["input-title"]}>
            이메일
          </label>
          <input
            className={styles["input-field"]}
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          {loginMutation.isError && (
            <p className={styles.errorMessage}>이메일을 확인해 주세요.</p>
          )}

          <label htmlFor="password" className={styles["input-title"]}>
            비밀번호
          </label>
          <div className={styles["password-visible"]}>
            <input
              className={styles["input-field"]}
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {loginMutation.isError && (
              <p className={styles.errorMessage}>비밀번호를 확인해 주세요.</p>
            )}

            <button type="button" className={styles["eye-button"]}>
              <Image
                src="/images/btn_visibility_on_24px.png"
                alt="비밀번호 보기"
                width={24}
                height={24}
              />
            </button>
          </div>
          <button
            type="submit"
            className={styles["loginButton"]}
            disabled={!isFormValid || loginMutation.isPending}
          >
            로그인
          </button>
        </form>

        <div className={styles["simple_login"]}>
          <div className={styles["leftSimpleLogin"]}>
            <div>간편 로그인하기</div>
          </div>
          <div className={styles["rightSimpleLogin"]}>
            <Link href="https://www.google.com/">
              <Image
                src="/images/Component 2@3x.png"
                alt="구글"
                width={42}
                height={42}
              />
            </Link>
            <Link href="https://www.kakaocorp.com/page/">
              <Image
                src="/images/Component 3@3x.png"
                alt="카카오"
                width={42}
                height={42}
              />
            </Link>
          </div>
        </div>

        <div className={styles["signup"]}>
          판다마켓이 처음이신가요?
          <Link href="/signup">회원가입</Link>
        </div>
      </div>
    </main>
  );
}
