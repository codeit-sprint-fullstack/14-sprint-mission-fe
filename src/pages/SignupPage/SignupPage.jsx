import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pandaLogo from "../../assets/panda-logo.svg";
import eyeIcon from "../../assets/btn_eye.png";
import eyeOffIcon from "../../assets/btn_eye_off.png";
import googleBg from "../../assets/google-bg.svg";
import googleLogo from "../../assets/google-logo.png";
import kakaoBg from "../../assets/kakao-bg.svg";
import kakaoLogo from "../../assets/kakao-logo.svg";
import "./SignupPage.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [touched, setTouched] = useState({
    email: false,
    nickname: false,
    password: false,
    passwordConfirm: false,
  });

  const errors = {
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  };

  if (email.trim() === "") {
    errors.email = "이메일을 입력해주세요.";
  } else if (!emailRegex.test(email.trim())) {
    errors.email = "잘못된 이메일 형식입니다.";
  }

  if (nickname.trim() === "") {
    errors.nickname = "닉네임을 입력해주세요.";
  }

  if (password === "") {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (password.length < 8) {
    errors.password = "비밀번호를 8자 이상 입력해주세요.";
  }

  if (passwordConfirm === "") {
    errors.passwordConfirm = "비밀번호를 다시 한 번 입력해주세요.";
  } else if (passwordConfirm !== password) {
    errors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
  }

  const isFormValid =
    email.trim() !== "" &&
    nickname.trim() !== "" &&
    password !== "" &&
    passwordConfirm !== "" &&
    errors.email === "" &&
    errors.nickname === "" &&
    errors.password === "" &&
    errors.passwordConfirm === "";

  function handleBlur(fieldName) {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [fieldName]: true,
    }));
  }

  function showError(fieldName) {
    return touched[fieldName] && errors[fieldName] !== "";
  }

  function handleSubmit(e) {
    e.preventDefault();

    setTouched({
      email: true,
      nickname: true,
      password: true,
      passwordConfirm: true,
    });

    if (!isFormValid) {
      return;
    }

    navigate("/login");
  }

  return (
    <main className="auth-page">
      <div className="auth-box">
        <div className="auth-logo-box">
          <Link to="/" className="auth-logo-link">
            <img
              className="auth-logo-img"
              src={pandaLogo}
              alt="판다 로고"
            />
            <span className="auth-logo-text">판다마켓</span>
          </Link>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="signup-email">
              이메일
            </label>

            <input
              id="signup-email"
              className={
                showError("email")
                  ? "auth-input auth-input-error"
                  : "auth-input"
              }
              type="text"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onBlur={() => {
                handleBlur("email");
              }}
            />

            {showError("email") && (
              <p className="auth-error">{errors.email}</p>
            )}
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="signup-nickname">
              닉네임
            </label>

            <input
              id="signup-nickname"
              className={
                showError("nickname")
                  ? "auth-input auth-input-error"
                  : "auth-input"
              }
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              onBlur={() => {
                handleBlur("nickname");
              }}
            />

            {showError("nickname") && (
              <p className="auth-error">{errors.nickname}</p>
            )}
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="signup-password">
              비밀번호
            </label>

            <div className="auth-password-container">
              <input
                id="signup-password"
                className={
                  showError("password")
                    ? "auth-input auth-input-error"
                    : "auth-input"
                }
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onBlur={() => {
                  handleBlur("password");
                }}
              />

              <button
                className="auth-toggle-button"
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <img
                  className="auth-toggle-icon"
                  src={showPassword ? eyeIcon : eyeOffIcon}
                  alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                />
              </button>
            </div>

            {showError("password") && (
              <p className="auth-error">{errors.password}</p>
            )}
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="signup-password-confirm">
              비밀번호 확인
            </label>

            <div className="auth-password-container">
              <input
                id="signup-password-confirm"
                className={
                  showError("passwordConfirm")
                    ? "auth-input auth-input-error"
                    : "auth-input"
                }
                type={showPasswordConfirm ? "text" : "password"}
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                value={passwordConfirm}
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
                onBlur={() => {
                  handleBlur("passwordConfirm");
                }}
              />

              <button
                className="auth-toggle-button"
                type="button"
                onClick={() => {
                  setShowPasswordConfirm(!showPasswordConfirm);
                }}
              >
                <img
                  className="auth-toggle-icon"
                  src={showPasswordConfirm ? eyeIcon : eyeOffIcon}
                  alt={
                    showPasswordConfirm
                      ? "비밀번호 확인 숨기기"
                      : "비밀번호 확인 보기"
                  }
                />
              </button>
            </div>

            {showError("passwordConfirm") && (
              <p className="auth-error">{errors.passwordConfirm}</p>
            )}
          </div>

          <button
            className={
              isFormValid
                ? "auth-submit-button active"
                : "auth-submit-button"
            }
            type="submit"
            disabled={!isFormValid}
          >
            회원가입
          </button>
        </form>

        <div className="auth-social-box">
          <div className="auth-social-content">
            <p className="auth-social-text">간편 로그인하기</p>

            <div className="auth-social-links">
              <a
                className="auth-social-button"
                href="https://www.google.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="구글 로그인"
              >
                <img
                  className="auth-social-bg"
                  src={googleBg}
                  alt=""
                />
                <img
                  className="auth-social-logo"
                  src={googleLogo}
                  alt="구글 로고"
                />
              </a>

              <a
                className="auth-social-button"
                href="https://www.kakaocorp.com/page/"
                target="_blank"
                rel="noreferrer"
                aria-label="카카오 로그인"
              >
                <img
                  className="auth-social-bg"
                  src={kakaoBg}
                  alt=""
                />
                <img
                  className="auth-social-logo"
                  src={kakaoLogo}
                  alt="카카오 로고"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="auth-link-box">
          <span className="auth-link-text">이미 회원이신가요?</span>
          <Link to="/login" className="auth-link">
            로그인
          </Link>
        </div>
      </div>
    </main>
  );
}

export default SignupPage;