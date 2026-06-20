import Logo from './Logo.jsx';
import { handleMobileHeaderClick } from '../utils/navigation.js';

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[4.375rem] bg-gray-100" onClick={handleMobileHeaderClick}>
      <div className="header-content">
        <Logo />
        <a
          href="#/login"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 font-semibold leading-6 text-gray-100 transition hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-primary/25"
        >
          로그인
        </a>
      </div>
    </header>
  );
}

export default Header;
