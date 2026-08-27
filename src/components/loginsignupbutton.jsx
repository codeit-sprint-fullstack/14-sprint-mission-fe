import Link from 'next/link';
import style from "./loginsignupbutton.module.css";

function LoginSignupButton({ disabled, message }) {
  return (
    <button
      type="submit"
      className={disabled ? style.loginButton : `${style.loginButton} ${style.Allow}`}
      disabled={disabled}
    >
      {message}
    </button>
  );
}

export default LoginSignupButton;
