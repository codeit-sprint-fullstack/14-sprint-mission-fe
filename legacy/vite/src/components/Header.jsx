import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo.jsx';

const defaultNavLinks = [
  { to: '/free-board', label: '자유게시판' },
  { to: '/items', label: '중고마켓' },
];

function Header({ logoMode = 'market', navLinks = defaultNavLinks, variant = 'default' }) {
  const isMarketHeader = variant === 'market' || variant === 'default';

  if (isMarketHeader) {
    return (
      <header className="market-header">
        <div className="market-header__inner">
          <nav className="market-header__left" aria-label="주요 메뉴">
            <Logo logoMode={logoMode} />
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                className={({ isActive }) => `market-nav-link ${isActive ? 'is-active' : ''}`}
                to={to}
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <Link className="market-login" to="/login">로그인</Link>
        </div>
      </header>
    );
  }

  return null;
}

export default Header;
