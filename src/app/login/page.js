"use client"
import pandaLogo from "@/assets/logo.png";
import Input from "@/components/Input";
import { useAuth } from "@/provider/AuthProvider";
import styles from "@/styles/Sign.module.css";
import { validateEmail, validatePassword } from "@/utils/validation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/Modal";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const isFormValid =
    email !== "" &&
    password !== "" &&
    emailError === "" &&
    passwordError === "";
  const { handleLogin } = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleLogin({
        email,
        password,
      });
      router.push("/boards");
    } catch (error) {
      setModalMessage("로그인에 실패했습니다.")
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.signSection}>
          <div className={styles.signWrapper}>
            <div className={styles.logoWrap}>
              <Link href="/">
                <Image
                  className={styles.logo}
                  src={pandaLogo}
                  alt="판다마켓 로고"
                />
              </Link>
            </div>
            <div className={styles.signCont}>
              <div className={styles.signInput}>
                <div className={styles.inputTit}>
                  <p>이메일</p>
                </div>
                <Input
                  value={email}
                  className={`${styles.emailInput} ${emailError ? styles.inputError : ""}`}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="이메일을 입력해주세요"
                  onBlur={() => setEmailError(validateEmail(email))}
                />
                {emailError && (
                  <p className={styles.errorMessage}>{emailError}</p>
                )}
              </div>
              <div className={styles.signInput}>
                <div className={styles.inputTit}>
                  <p>비밀번호</p>
                </div>
                <div className={styles.paswordWrap}>
                  <Input
                    value={password}
                    type={showPassword ? "text" : "password"}
                    className={`${styles.passwordInput} ${passwordError ? styles.inputError : ""}`}
                    onChange={(event) => setPassword(event.target.value)}
                    onBlur={() => setPasswordError(validatePassword(password))}
                    placeholder="비밀번호를 입력해주세요"
                  />
                  <button type="button" className={styles.btnVisible} onClick={() => setShowPassword(!showPassword)} >
                    <span className={styles.hidden}>보이기</span>
                  </button>
                </div>
                {passwordError && (
                  <p className={styles.errorMessage}>{passwordError}</p>
                )}
              </div>
              <div className={styles.buttonWrap}>
                <button
                  type="submit"
                  className={styles.btnLogin}
                  disabled={!isFormValid}
                >
                  로그인
                </button>
              </div>
              <div className={styles.easyLoginWrap}>
                <p>간편 로그인하기</p>
                <div className={styles.easyLogin}>
                  <Link href="https://www.google.com" className={`${styles.btnEasy} ${styles.google}`}>
                    <span className={styles.hidden}>구글로그인</span>
                  </Link>
                  <Link href="https://www.kakaocorp.com/page" className={`${styles.btnEasy} ${styles.kakao}`}>
                    <span className={styles.hidden}>카카오로그인</span>
                  </Link>
                </div>
              </div>
              <div className={styles.infoWrap}>
                <p>판다마켓이 처음이신가요?</p>
                <Link href="/signup" >회원가입</Link>
              </div>
            </div>
          </div>
        </div>
      </form>
      {modalMessage && (
        <Modal
          message={modalMessage}
          onClose={()=> setModalMessage("")}
        />
      )}
    </>
  )
}