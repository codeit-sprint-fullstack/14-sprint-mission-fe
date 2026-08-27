import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import { getMe } from "@/lib/api/users";
import { hasAccessToken, removeAccessToken } from "@/lib/auth";
import { queryKeys } from "@/lib/queryKeys";
import styles from "./Header.module.css";

export default function Header() {
  const router = useRouter();
  const [authState, setAuthState] = useState({
    isChecked: false,
    hasToken: false,
  });

  useEffect(() => {
    function checkToken() {
      setAuthState({
        isChecked: true,
        hasToken: hasAccessToken(),
      });
    }

    checkToken();
    window.addEventListener("auth-changed", checkToken);

    return () => window.removeEventListener("auth-changed", checkToken);
  }, []);

  const {
    data: user,
    isPending: isUserPending,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: queryKeys.me,
    queryFn: getMe,
    enabled: authState.isChecked && authState.hasToken,
    retry: false,
    staleTime: 0,
  });

  useEffect(() => {
    if (!isUserError) {
      return;
    }

    if (userError?.response?.status === 401) {
      removeAccessToken();
    }
  }, [isUserError, userError]);

  const isCheckingUser =
    !authState.isChecked || (authState.hasToken && isUserPending);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link className={styles.logo} href="/" aria-label="판다마켓 홈">
            <Image
              className={styles.desktopLogo}
              src="/images/logo.png"
              alt="판다마켓"
              width={120}
              height={40}
              priority
            />
            <Image
              className={styles.mobileLogo}
              src="/images/logo-text.png"
              alt="판다마켓"
              width={100}
              height={25}
              priority
            />
          </Link>
          <nav className={styles.nav} aria-label="주요 메뉴">
            <Link
              className={`${styles.navLink} ${router.pathname.startsWith("/articles") ? styles.active : ""}`}
              href="/articles"
            >
              자유게시판
            </Link>
            <Link
              className={`${styles.navLink} ${router.pathname.startsWith("/items") ? styles.active : ""}`}
              href="/items"
            >
              중고마켓
            </Link>
          </nav>
        </div>
        {isCheckingUser ? (
          <div className={styles.profileSkeleton} aria-label="사용자 정보 확인 중" />
        ) : user ? (
          <div className={styles.profile}>
            {/* API 프로필 이미지는 외부 URL일 수 있어 기본 img 요소를 사용한다. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.profileImage}
              src={user.image || "/images/user-profile.svg"}
              alt=""
            />
            <span className={styles.nickname}>{user.nickname}</span>
          </div>
        ) : (
          <Link className={styles.loginButton} href="/signin">
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
