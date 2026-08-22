import Image from "next/image";
import Link from "next/link";
import styles from "./Landing.module.css";

export default function Home() {
  return (
    <main className={styles.landingMain}>
      <section className={styles.watchSection}>
        <div className={styles.watchContent}>
          <div className={styles.watchText}>
            <h1 className={styles.bigTitle}>
              일상의 모든 물건을
              <br />
              거래해 보세요
            </h1>

            <Link className={styles.visitButton} href="/items">
              구경하러 가기
            </Link>
          </div>

          <Image
            className={styles.watchImage}
            src="/images/Img_home_top.png"
            width={746}
            height={340}
            alt="판다마켓 중고 거래"
            loading="eager"
          />
        </div>
      </section>

      <section className={styles.itemSection}>
        <div className={styles.hotItemContent}>
          <div className={styles.imageBox}>
            <Image
              className={styles.itemImage}
              src="/images/Img_home_01.png"
              width={588}
              height={444}
              alt="판다마켓 인기 상품"
            />
          </div>

          <div className={styles.hotItemText}>
            <h2 className={styles.smallTitle}>Hot item</h2>

            <h3 className={styles.bigTitle}>
              인기 상품을
              <br />
              확인해 보세요
            </h3>

            <p className={styles.description}>
              가장 HOT한 중고거래 물품을
              <br />
              판다마켓에서 확인해 보세요
            </p>
          </div>
        </div>
      </section>

      <section className={styles.itemSection}>
        <div className={styles.searchContent}>
          <div className={styles.searchText}>
            <h2 className={styles.smallTitle}>Search</h2>

            <h3 className={styles.bigTitle}>
              구매를 원하는
              <br />
              상품을 검색하세요
            </h3>

            <p className={styles.description}>
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>

          <div className={styles.imageBox}>
            <Image
              className={styles.itemImage}
              src="/images/Img_home_02.png"
              width={588}
              height={444}
              alt="판다마켓 상품 검색"
            />
          </div>
        </div>
      </section>

      <section className={styles.itemSection}>
        <div className={styles.registerContent}>
          <div className={styles.imageBox}>
            <Image
              className={styles.itemImage}
              src="/images/Img_home_03.png"
              width={588}
              height={444}
              alt="판다마켓 상품 등록"
            />
          </div>

          <div className={styles.registerText}>
            <h2 className={styles.smallTitle}>Register</h2>

            <h3 className={styles.bigTitle}>
              판매를 원하는
              <br />
              상품을 등록하세요
            </h3>

            <p className={styles.description}>
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      <section className={styles.trustSection}>
        <div className={styles.trustText}>
          <h2 className={styles.bigTitle}>
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </h2>
        </div>

        <Image
          className={styles.trustImage}
          src="/images/Img_home_bottom.png"
          width={746}
          height={397}
          alt="믿을 수 있는 판다마켓 중고 거래"
        />
      </section>
    </main>
  );
}
