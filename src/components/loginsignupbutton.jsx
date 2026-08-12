import Link from 'next/link';
import style from "./loginsignupbutton.module.css";

function LoginSignupButton({ disabled }) {
  return (
    <Link href="/" className={disabled ? style.loginButton : `${style.loginButton} ${style.Allow}`}>
      로그인
    </Link>
  );
}

export default LoginSignupButton;
