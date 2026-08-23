import Image from "next/image";

import styles from "./SearchSection.module.css";

// 상품 검색 소개 영역
export default function SearchSection() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.textGroup}>
          <p className={styles.eyebrow}>
            Search
          </p>

          <h2 className={styles.title}>
            구매를 원하는
            <br />
            상품을 검색하세요
          </h2>

          <p className={styles.description}>
            구매하고 싶은 물품은 검색해서
            <br />
            쉽게 찾아보세요
          </p>
        </div>

        <Image
          src="/img/Magnifier.png"
          alt="돋보기 이미지"
          width={588}
          height={444}
          className={styles.image}
        />
      </div>
    </section>
  );
}