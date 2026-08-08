"use client";

import Link from "next/link";
import Image from "next/image";
import "./NavBar.css";
import Button from "@/components/Button/Button";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const isBoardsActive =
    pathname === "/boards" || pathname.startsWith("/boards/");

  return (
    <nav className="nav-container">
      <div className="nav-wrapper">
        <div className="logo-wrapper">
          <Link href="/" className="logo-group">
            <Image
              className="panda-logo"
              src="/images/panda-logo.svg"
              alt="판다 얼굴"
              width={40}
              height={40}
            />
            <span className="logo-text">판다마켓</span>
          </Link>
          <div className="nav-texts">
            <Link
              href="/boards"
              className={`nav-text ${isBoardsActive ? "nav-text-active" : ""}`}
            >
              자유게시판
            </Link>
            <Link href="/items" className="nav-text">
              중고마켓
            </Link>
          </div>
        </div>
        <div className="button-group">
          <Button href="/login">로그인</Button>
        </div>
      </div>
    </nav>
  );
}
