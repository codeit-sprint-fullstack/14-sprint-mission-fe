import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <div className={styles["login_area"]}>
        <Link href="index.html" className={styles["logo"]}>
          <Image
            src="images/판다 얼굴.svg"
            alt="로고"
            width={103}
            height={103}
          />
          <span className={styles["panda-letters"]}>판다마켓</span>
        </Link>
        <form>
          <label htmlFor="email" className={styles["input-title"]}>
            이메일
          </label>
          <input
            className={styles["input-field"]}
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            required
          />

          <label htmlFor="password" className={styles["input-title"]}>
            비밀번호
          </label>
          <div className={styles["password-visible"]}>
            <input
              className={styles["input-field"]}
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              required
            />
            <button type="button" className={styles["eye-button"]}>
              <Image
                src="/images/btn_visibility_on_24px.png"
                alt="비밀번호 보기"
                width={24}
                height={24}
              />
            </button>
          </div>
          <button type="submit" className={styles["loginButton"]}>
            로그인
          </button>
        </form>

        <div className={styles["simple_login"]}>
          <div className={styles["leftSimpleLogin"]}>
            <div>간편 로그인하기</div>
          </div>
          <div className={styles["rightSimpleLogin"]}>
            <Link href="https://www.google.com/">
              <Image
                src="/images/Component 2@3x.png"
                alt="구글"
                width={42}
                height={42}
              />
            </Link>
            <Link href="https://www.kakaocorp.com/page/">
              <Image
                src="/images/Component 3@3x.png"
                alt="카카오"
                width={42}
                height={42}
              />
            </Link>
          </div>
        </div>

        <div className={styles["signup"]}>
          판다마켓이 처음이신가요?
          <Link href="/signup">회원가입</Link>
        </div>
      </div>
    </main>
  );
}
