"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import { getApiErrorMessage } from "@/lib/apiError";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./AuthPageLayout.module.css";

export default function AuthPageLayout({
  children,
  description,
  linkText,
  linkHref,
}) {
  const router = useRouter();
  const {
    data: currentUser,
    isCheckingAuth,
    hasAuthError,
    error: authError,
  } = useCurrentUser();

  useEffect(() => {
    if (isCheckingAuth || hasAuthError || !currentUser) {
      return;
    }

    router.replace("/items");
  }, [currentUser, isCheckingAuth, hasAuthError, router]);

  if (isCheckingAuth) {
    return null;
  }

  if (hasAuthError) {
    const authErrorMessage = getApiErrorMessage(
      authError,
      "로그인 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
    );

    return <p>{authErrorMessage}</p>;
  }

  if (currentUser) {
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.box}>
        <Link href="/" className={styles.logoLink}>
          <Image
            className={styles.logoImage}
            src="/images/auth/panda-logo.svg"
            alt="판다 로고"
            width={104}
            height={104}
          />

          <span className={styles.logoText}>판다마켓</span>
        </Link>

        {children}

        <div className={styles.socialBox}>
          <div className={styles.socialContent}>
            <p className={styles.socialText}>간편 로그인하기</p>

            <div className={styles.socialLinks}>
              <a
                className={styles.socialButton}
                href="https://www.google.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="구글 로그인"
              >
                <Image
                  className={styles.socialBg}
                  src="/images/auth/google-bg.svg"
                  alt=""
                  width={42}
                  height={42}
                />
                <Image
                  className={styles.socialLogo}
                  src="/images/auth/google-logo.png"
                  alt="구글 로고"
                  width={22}
                  height={22}
                />
              </a>

              <a
                className={styles.socialButton}
                href="https://www.kakaocorp.com/page/"
                target="_blank"
                rel="noreferrer"
                aria-label="카카오 로그인"
              >
                <Image
                  className={styles.socialBg}
                  src="/images/auth/kakao-bg.svg"
                  alt=""
                  width={42}
                  height={42}
                />
                <Image
                  className={styles.socialLogo}
                  src="/images/auth/kakao-logo.svg"
                  alt="카카오 로고"
                  width={22}
                  height={22}
                />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.linkBox}>
          <span className={styles.linkText}>{description}</span>

          <Link href={linkHref} className={styles.link}>
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  );
}
