"use client";
import Link from "next/link";
import styles from "../components/Header.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/authProvider";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { setAccessToken } = useAuth();

  const router = useRouter();

  const handleSubmit = async () => {
    if (password !== passwordConfirmation) {
      alert("비밀번호가 일치하지않습니다.");
      return;
    }
    const res = await fetch("https://panda-market-api.vercel.app/auth/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);
      alert("회원가입에 실패했습니다.");

      return;
    }

    const data = await res.json();
    localStorage.setItem("accessToken", data.accessToken);
    setAccessToken(data.accessToken);
    router.push("/items");
  };
  return (
    <div>
      <Link href="/" className={styles.logoLink}>
        <Image
          src="./images/panda_logo.svg"
          alt="판다마켓 로고"
          width={100}
          height={50}
          priority
          style={{ width: "auto", height: "auto" }}
        />
        <span>판다마켓</span>
      </Link>
      <div>
        <p>이메일</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="이메일을 입력해주세요."
        />
      </div>
      <div>
        <p>닉네임</p>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          type="text"
          placeholder="닉네임을 입력해주세요."
        />
      </div>

      <div>
        <p>비밀번호</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
      </div>

      <div>
        <p>비밀번호확인</p>
        <input
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
      </div>

      <button onClick={handleSubmit}>회원가입</button>

      <div>
        <span>간편로그인하기</span>

        <Link
          href="https://www.kakaocorp.com/page/"
          className={styles.kakaoLoginButton}
        >
          카카오
        </Link>

        <Link
          href="https://www.google.com/"
          className={styles.kakaoLoginButton}
        >
          구글
        </Link>
      </div>

      <span>이미 회원이신가요?</span>
      <Link href="/login" className={styles.loginButton}>
        로그인
      </Link>
    </div>
  );
};
export default SignUp;
