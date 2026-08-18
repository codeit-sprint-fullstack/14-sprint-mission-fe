import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "@/api/usersApi";

export default function Header() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isBoardsPage = router.pathname.startsWith("/boards");
  const isItemsPage = router.pathname.startsWith("/items");

  const [accessToken, setAccessToken] = useState(null);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const savedAccessToken = localStorage.getItem("accessToken");

    setAccessToken(savedAccessToken);
    setIsTokenChecked(true);
  }, []);

  const {
    data: user,
    error: userError,
    isLoading: isUserLoading,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(accessToken),
    enabled: isTokenChecked && Boolean(accessToken),
    retry: false,
  });

  useEffect(() => {
    if (userError && userError.status === 401) {
      localStorage.removeItem("accessToken");
      setAccessToken(null);
    }
  }, [userError]);

  function handleLogout() {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    setIsProfileMenuOpen(false);

    queryClient.removeQueries({
      queryKey: ["currentUser"],
    });

    router.replace("/");
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link
            href="/"
            className={styles.logo}
            aria-label="판다마켓 렌딩페이지로 이동"
          >
            <Image
              src="/images/logo.png"
              alt="판다마켓 로고"
              width={102}
              height={34}
              priority
            />
          </Link>

          <nav className={styles.navigation} aria-label="주요 메뉴">
            <Link
              href="/boards"
              className={`${styles.navLink} ${
                isBoardsPage ? styles.active : ""
              }`}
            >
              자유게시판
            </Link>

            <Link
              href="/items"
              className={`${styles.navLink} ${
                isItemsPage ? styles.active : ""
              }`}
            >
              중고마켓
            </Link>
          </nav>
        </div>

        <div className={styles.authArea}>
          {isTokenChecked && !isUserLoading && (
            <>
              {user ? (
                <div className={styles.profileMenu}>
                  <button
                    className={styles.profile}
                    type="button"
                    onClick={() => {
                      setIsProfileMenuOpen((previous) => !previous);
                    }}
                  >
                    <img
                      className={styles.profileImage}
                      src={user.image || "/images/default_profile.png"}
                      alt={`${user.nickname} 프로필`}
                    />

                    <span className={styles.nickname}>{user.nickname}</span>
                  </button>

                  {isProfileMenuOpen && (
                    <div className={styles.logoutMenu}>
                      <button
                        className={styles.logoutButton}
                        type="button"
                        onClick={handleLogout}
                      >
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/signin" className={styles.loginButton}>
                  로그인
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
