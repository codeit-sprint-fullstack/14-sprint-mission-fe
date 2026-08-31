import Image from "next/image";

import styles from "./HotItem.module.css";

// 인기 상품 소개 영역
export default function HotItem() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <Image
          src="/img/Img_clothes_01.png"
          alt="의류 이미지"
          width={588}
          height={444}
          className={styles.image}
        />

        <div className={styles.textGroup}>
          <p className={styles.eyebrow}>
            Hot item
          </p>

          <h2 className={styles.title}>
            인기 상품을
            <br />
            확인해 보세요
          </h2>

          <p className={styles.description}>
            가장 HOT한 중고거래 물품을
            <br />
            판다 마켓에서 확인해보세요
          </p>
        </div>
      </div>
    </section>
  );
}