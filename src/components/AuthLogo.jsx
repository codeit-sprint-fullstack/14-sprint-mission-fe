import Link from 'next/link';

function AuthLogo() {
  return (
    <Link className="logo" href="/">
      <img src="/img/panda_logo.png" alt="판다마켓 로고" />
      <span>판다마켓</span>
    </Link>
  );
}

export default AuthLogo;
