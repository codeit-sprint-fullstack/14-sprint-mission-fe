import Link from "next/link";
import Image from "next/image";
import Input from "@/components/Input";
import styles from "@/styles/Sign.module.css";
import pandaLogo from "@/assets/logo.png";

export default function LoginPage() {
  return (
    <>
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
                className={styles.emailInput}
                placeholder="이메일을 입력해주세요"
              />
            </div>
            <div className={styles.signInput}>
              <div className={styles.inputTit}>
                <p>비밀번호</p>
              </div>
              <div className={styles.paswordWrap}>
                <Input
                  type="password"
                  className={styles.passwordInput}
                  placeholder="비밀번호를 입력해주세요"
                />
                <button className={styles.btnVisible}>
                  <span className={styles.hidden}>보이기</span>
                </button>
              </div>
            </div>
            <div className={styles.buttonWrap}>
              <button className={styles.btnLogin}>
                로그인
              </button>
            </div>
            <div className={styles.easyLoginWrap}>
              <p>간편 로그인하기</p>
              <div className={styles.easyLogin}>
                <Link href="/boards/write" className={`${styles.btnEasy} ${styles.google}`}>
                  <span className={styles.hidden}>구글로그인</span>
                </Link>
                <Link href="/boards/write" className={`${styles.btnEasy} ${styles.kakao}`}>
                  <span className={styles.hidden}>카카오로그인</span>
                </Link>
              </div>
            </div>
            <div className={styles.infoSignup}>
              <p>판다마켓이 처음이신가요?</p>
              <Link href="/boards/write" >회원가입</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}