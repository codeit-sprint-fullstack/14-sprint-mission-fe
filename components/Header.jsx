'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const navLinks = [
  { href: '/free-board', label: '자유게시판' },
  { href: '/items', label: '중고마켓' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="market-header">
      <div className="market-header__inner">
        <nav className="market-header__left" aria-label="주요 메뉴">
          <Logo pathname={pathname} />
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                className={`market-nav-link ${isActive ? 'is-active' : ''}`}
                href={href}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <Link className="market-login" href="/login">로그인</Link>
      </div>
    </header>
  );
}
