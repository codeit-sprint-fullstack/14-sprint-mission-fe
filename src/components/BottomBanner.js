import Image from "next/image";

import styles from "./BottomBanner.module.css";

// 하단 판다 배너 영역
export default function BottomBanner() {
  return (
    <section className={styles.banner}>
      <h2 className={styles.title}>
        믿을 수 있는
        <br />
        판다마켓 중고 거래
      </h2>

      <Image
        src="/img/img02.png"
        alt="판다 말풍선"
        width={746}
        height={397}
        className={styles.image}
      />
    </section>
  );
}