import Link from "next/link";
import Image from "next/image";
import Input from "@/components/Input";
import styles from "@/styles/Sign.module.css";
import pandaLogo from "@/assets/logo.png";

export default function LoginPage() {
  return (
    <>
      <div className={styles.signWrapper}>
        <div className={styles.logoWrap}>
          <Image
            className={styles.logo}
            src={pandaLogo}
            alt="판다마켓 로고"
          /> 
        </div>
        <div styleName={styles.hi}></div>
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
            <Input
              className={styles.passwordInput}
              placeholder="비밀번호를 입력해주세요"
            />
          </div>
          <div className={styles.buttonWrap}>
            <button className={styles.btnLogin}>
              로그인
            </button>
            zztest
          </div>
          <div className={styles.easyLoginWrap}>
            <p>간편 로그인하기</p>
            <div className={styles.easyLogin}>
              <Link className={styles.Google}>
                <span>구글로그인</span>
              </Link>
              <Link className={styles.kakao}>
                <span>카카오로그인</span>
              </Link>
            </div>
          </div>
          <div className={styles.infoSignup}>
            <p>판다마켓이 처음이신가요?</p>
            <Link>회원가입</Link>
          </div>
        </div>
      </div>
    </>
  )
}