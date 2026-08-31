import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import Image from "next/image";
import Link from "next/link";
import pandaMarketApi from "@/lib/api";

import styles from "./Header.module.css";

export default function Header() {
  const router = useRouter();
  const { pathname } = router;

  const [accessToken, setAccessToken] = useState(null);

  // 브라우저에 저장된 로그인 토큰 확인
  useEffect(() => {
    const storedAccessToken =
      localStorage.getItem("accessToken");

    setAccessToken(storedAccessToken);
  }, [pathname]);

  // 로그인한 사용자 정보 불러오기
  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await pandaMarketApi.get(
        "/users/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return response.data;
    },
    enabled: Boolean(accessToken),
  });

  // 로그인과 회원가입 페이지에서는 Header 숨김
  if (pathname === "/signin" || pathname === "/signup") {
    return null;
  }

  // 메뉴가 필요한 페이지인지 확인
  const showNavigation =
    pathname.startsWith("/articles") ||
    pathname.startsWith("/items") ||
    pathname === "/registration";

  // 현재 활성화된 메뉴 확인
  const isArticlesActive = pathname.startsWith("/articles");

  const isItemsActive =
    pathname.startsWith("/items") ||
    pathname === "/registration";

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.headerLeft}>
          <Link
            href="/"
            className={styles.logo}
          >
            <Image
              src="/img/판다얼굴.png"
              alt="판다 얼굴"
              width={40}
              height={40}
              className={styles.pandaFace}
            />

            <span className={styles.logoText}>
              판다마켓
            </span>
          </Link>

          {showNavigation && (
            <nav
              className={styles.navigation}
              aria-label="주요 메뉴"
            >
              <Link
                href="/articles"
                className={`${styles.navigationLink} ${isArticlesActive
                  ? styles.activeNavigationLink
                  : ""
                  }`}
                aria-current={
                  isArticlesActive ? "page" : undefined
                }
              >
                자유게시판
              </Link>

              <Link
                href="/items"
                className={`${styles.navigationLink} ${isItemsActive
                  ? styles.activeNavigationLink
                  : ""
                  }`}
                aria-current={
                  isItemsActive ? "page" : undefined
                }
              >
                중고마켓
              </Link>
            </nav>
          )}
        </div>

        <div className={styles.loginArea}>
          {accessToken && user ? (
            <>
              <Image
                src="/img/ic_profile.svg"
                alt="프로필"
                width={40}
                height={40}
              />

              <span>{user.nickname}</span>
            </>
          ) : (
            <Link
              href="/signin"
              className={styles.loginButton}
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}