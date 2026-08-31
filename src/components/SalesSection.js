import Image from "next/image";

import styles from "./SalesSection.module.css";

// 판매 상품 등록 소개 영역
export default function SalesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <Image
          src="/img/Img01.png"
          alt="판매 등록 이미지"
          width={588}
          height={444}
          className={styles.image}
        />

        <div className={styles.textGroup}>
          <p className={styles.eyebrow}>
            Register
          </p>

          <h2 className={styles.title}>
            판매를 원하는
            <br />
            상품을 등록하세요
          </h2>

          <p className={styles.description}>
            어떤 물건이든 판매하고 싶은 상품을
            <br />
            쉽게 등록하세요
          </p>
        </div>
      </div>
    </section>
  );
}