import { useState } from "react";
import { validateEmail, validatePassword } from "../js/Login";

import "../styles/Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("잘못된 이메일 형식입니다");
      return;
    }

    if (!validatePassword(password)) {
      alert("비밀번호를 8자 이상 입력해주세요.");
      return;
    }

    console.log("로그인 시도", email);
  };

  return (
    <main className="auth-container">
      <div className="logo-home-button-wrapper">
        <a href="/">
          <img src="../images/logo/logo.svg" alt="판다마켓 홈" width="396" />
        </a>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-item">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력해 주세요"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-item">
          <label htmlFor="password">비밀번호</label>
          <div className="input-wrapper">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="password-toggle-button"
              aria-label="비밀번호 보기"
            >
              <img
                src="../images/icons/eye-invisible.svg"
                alt="비밀번호 숨김 상태 아이콘"
              />
            </button>
          </div>
        </div>

        <button type="submit" className="button pill-button full-width">
          로그인
        </button>
      </form>

      <div className="social-login-container">
        <h3>간편 로그인하기</h3>
        <div className="social-login-buttons-container">
          <a
            href="https://www.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="구글 로그인"
          >
            <img
              src="../images/social/google-logo.png"
              alt="구글 로그인"
              width="42"
            />
          </a>
          <a
            href="https://www.kakaocorp.com/page/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="카카오톡 로그인"
          >
            <img
              src="../images/social/kakao-logo.png"
              alt="카카오톡 로그인"
              width="42"
            />
          </a>
        </div>
      </div>

      <div className="auth-switch">
        판다마켓이 처음이신가요? <a href="/signup">회원가입</a>
      </div>
    </main>
  );
}
