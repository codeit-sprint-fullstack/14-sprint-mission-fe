"use client";
import Link from "next/dist/client/link";
import styles from "../components/Header.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/authProvider";

const Login = () => {
  const { setAccessToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/items");
    }
  }, []);
  const handleSubmit = async () => {
    const res = await fetch("https://panda-market-api.vercel.app/auth/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.log("로그인실패:", errorData);
      alert("로그인에 실패했습니다.");

      return;
    }
    const data = await res.json();
    localStorage.setItem("accessToken", data.accessToken);
    setAccessToken(data.accessToken);
    console.log("확인용", localStorage.getItem("accessToken"));
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
        <button></button>
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

      <button onClick={handleSubmit}>로그인</button>

      <div>
        <span>간편로그인하기</span>

        <Link href="/login/kakao" className={styles.kakaoLoginButton}>
          카카오
        </Link>

        <Link href="/login/kakao" className={styles.kakaoLoginButton}>
          구글
        </Link>
      </div>

      <span>아직 회원이 아니신가요?</span>
      <Link href="/signUp" className={styles.signupButton}>
        회원가입
      </Link>
    </div>
  );
};
export default Login;
