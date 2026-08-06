'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Header() {
  const pathname = usePathname();

  return (
    <div className="header">
      <div className="inner">
        <Link className="logoLink" href="/">
          <img src="/img/panda_logo.png" alt="판다마켓 로고" />
          <span>판다마켓</span>
        </Link>
        <nav className="headerNav">
          <Link
            className="navLink"
            href="/board"
            style={{ color: pathname.startsWith('/board') ? '#3692FF' : '' }}
          >
            자유게시판
          </Link>
          <Link
            className="navLink"
            href="/items"
            style={{ color: pathname.startsWith('/items') ? '#3692FF' : '' }}
          >
            중고마켓
          </Link>
        </nav>
        <Link className="loginButton" href="/login">로그인</Link>
      </div>
    </div>
  );
}

export default Header;
