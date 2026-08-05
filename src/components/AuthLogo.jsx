import { Link } from 'react-router-dom';

function AuthLogo() {
  return (
    <Link className="logo" to="/">
      <img src="/img/panda_logo.png" alt="판다마켓 로고" />
      <span>판다마켓</span>
    </Link>
  );
}

export default AuthLogo;
