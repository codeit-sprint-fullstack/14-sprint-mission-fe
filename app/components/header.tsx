"use client";

import {usePathname} from "next/navigation";
import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";



const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname()
    const isLandingPage = pathname === "/";

    if (pathname === "/login" || pathname === "/signUp") {
        return null;
    }
    
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logoLink}>
                <Image
  src="/images/panda_logo.svg"
  alt="판다마켓 로고"
  width={100}
  height={50}
  priority
  style={{ width: "auto", height: "auto" }}
/>
                <span>판다마켓</span>
            </Link>

            <Link href="/articles" className={styles.navLink}>
                <span>자유게시판</span>
            </Link>
            <Link href="/items" className={styles.navLink}>
                <span>중고마켓</span>
            </Link>

            <Link href="/login" className={styles.loginButton}>
                로그인
            </Link>

        </header>
    )
}



export default Header;