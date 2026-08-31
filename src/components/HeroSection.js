import Image from "next/image";
import Link from "next/link";

import styles from "./HeroSection.module.css";

// 메인 페이지 상단 상품 구경 영역
export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          일상의 모든 물건을
          <br />
          거래해 보세요.
        </h1>

        <div className={styles.buttonGroup}>
          <Link
            href="/items"
            className={styles.button}
          >
            구경하러 가기
          </Link>
        </div>
      </div>

      <Image
        src="/img/Img_home_top.png"
        alt="판다 집"
        width={746}
        height={340}
        className={styles.image}
      />
    </section>
  );
}