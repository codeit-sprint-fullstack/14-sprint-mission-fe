import Link from "next/dist/client/link";
import styles from "../components/Header.module.css";
import Image from "next/image";

const login = () => {
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
                <input type="text" placeholder="이메일을 입력해주세요." />
            </div>

            <div>
                <p>비밀번호</p>
                <input type="password" placeholder="비밀번호를 입력해주세요." />
            </div>

            <button>로그인</button>

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
    )   
}
export default login;