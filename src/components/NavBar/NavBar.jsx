"use client";

import Button from "@/components/Button/Button";
import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const pathname = usePathname();
  const { data: currentUser, isCheckingAuth } = useCurrentUser();

  const isBoardsActive =
    pathname === "/boards" || pathname.startsWith("/boards/");

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link href="/" className={styles.brand}>
            <Image
              className={styles.logo}
              src="/images/panda-logo.svg"
              alt="판다 얼굴"
              width={40}
              height={40}
            />
            <span className={styles.brandName}>판다마켓</span>
          </Link>

          <div className={styles.links}>
            <Link
              href="/boards"
              className={`${styles.link} ${
                isBoardsActive ? styles.active : ""
              }`}
            >
              자유게시판
            </Link>

            <Link href="/items" className={styles.link}>
              중고마켓
            </Link>
          </div>
        </div>

        <div className={styles.actions}>
          {!isCheckingAuth &&
            (currentUser ? (
              <Link href="/me" className={styles.profile}>
                <Image
                  src="/images/ic_profile.svg"
                  alt="프로필"
                  width={40}
                  height={40}
                />
                <span className={styles.nickname}>{currentUser.nickname}</span>
              </Link>
            ) : (
              <Button href="/signin">로그인</Button>
            ))}
        </div>
      </div>
    </nav>
  );
}
