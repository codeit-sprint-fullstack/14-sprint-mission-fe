"use client"
import pandaLogo from "@/assets/logo.png";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { useAuth } from "@/provider/AuthProvider";
import styles from "@/styles/Sign.module.css";
import { validateEmail, validatePassword } from "@/utils/validation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const isFormValid =
    email !== "" &&
    nickname !== "" &&
    password !== "" &&
    passwordConfirm !== "" &&
    validateEmail(email) === "" &&
    validatePassword(password) === "" &&
    password === passwordConfirm;
  const { handleSignUp } = useAuth();
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await handleSignUp({
      email,
      password,
      nickname,
      passwordConfirmation: passwordConfirm,
    });
      router.push("/login");
    } catch (error) {
      setModalMessage(error.response?.data?.message);
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
                  <p>닉네임</p>
                </div>
                <Input
                  value={nickname}
                  className={styles.nickInput}
                  onChange={(event) => setNickname(event.target.value)}
                  placeholder="닉네임을 입력해주세요"
                />
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
                  <button type="button" className={styles.btnVisible} onClick={() => setShowPassword(!showPassword)}>
                    <span className={styles.hidden}>보이기</span>
                  </button>
                </div>
                {passwordError && (
                  <p className={styles.errorMessage}>{passwordError}</p>
                )}
              </div>
              <div className={styles.signInput}>
                <div className={styles.inputTit}>
                  <p>비밀번호 확인</p>
                </div>
                <div className={styles.paswordWrap}>
                  <Input
                    value={passwordConfirm}
                    type={showPasswordConfirm ? "text" : "password"}
                    className={`${styles.passwordReInput} ${passwordConfirmError ? styles.inputError : ""
                      }`}
                    onChange={(event) => setPasswordConfirm(event.target.value)}
                    onBlur={() => {
                      if (!passwordConfirm) {
                        setPasswordConfirmError("비밀번호를 다시 입력해주세요.");
                      } else if (passwordConfirm !== password) {
                        setPasswordConfirmError("비밀번호가 일치하지 않아요.");
                      } else {
                        setPasswordConfirmError("");
                      }
                    }}
                    placeholder="비밀번호를 다시 한 번 입력해주세요"
                  />
                  <button type="button" className={styles.btnVisible} onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>
                    <span className={styles.hidden}>보이기</span>
                  </button>
                </div>
                {passwordConfirmError && (
                  <p className={styles.errorMessage}>{passwordConfirmError}</p>
                )}
              </div>
              <div className={styles.buttonWrap}>
                <button
                  type="submit"
                  className={styles.btnLogin}
                  disabled={!isFormValid}
                >
                  회원가입
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
                <p>이미 회원이신가요?</p>
                <Link href="/login" >로그인</Link>
              </div>
            </div>
          </div>
        </div>
      </form>
      {modalMessage && (
        <Modal
          message={modalMessage}
          onClose={() => setModalMessage("")}
        />
      )}
    </>
  )
}