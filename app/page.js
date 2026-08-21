import Link from "next/link";
import Image from "next/image";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <section className={`${styles.banner} ${styles.hero}`}>
        <div className={styles.inner}>
          <div className={styles.heroText}>
            <h1>
              일상의 모든 물건을
              <br />
              거래해 보세요
            </h1>
            <Link href="/items" className="button pill-button">
              구경하러 가기
            </Link>
          </div>
          <Image
            src="/images/home/Img_home_top.svg"
            alt=""
            width={746}
            height={397}
            className={styles.heroImg}
            aria-hidden="true"
          />
        </div>
      </section>

      <section className={`wrapper ${styles.features}`}>
        <div className={styles.feature}>
          <Image
            src="/images/home/Img_home_01.svg"
            alt="인기 상품"
            width={480}
            height={480}
            className={styles.featureImg}
          />
          <div className={styles.featureContent}>
            <p className={styles.featureTag}>Hot item</p>
            <h2>
              인기 상품을
              <br />
              확인해 보세요
            </h2>
            <p className={styles.featureDescription}>
              가장 HOT한 중고거래 물품을
              <br />
              판다마켓에서 확인해 보세요
            </p>
          </div>
        </div>

        <div className={styles.feature}>
          <div className={styles.featureContent}>
            <p className={styles.featureTag}>Search</p>
            <h2>
              구매를 원하는
              <br />
              상품을 검색하세요
            </h2>
            <p className={styles.featureDescription}>
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
          <Image
            src="/images/home/Img_home_02.svg"
            alt="검색 기능"
            width={480}
            height={480}
            className={styles.featureImg}
          />
        </div>

        <div className={styles.feature}>
          <Image
            src="/images/home/Img_home_03.svg"
            alt="판매 상품 등록"
            width={480}
            height={480}
            className={styles.featureImg}
          />
          <div className={styles.featureContent}>
            <p className={styles.featureTag}>Register</p>
            <h2>
              판매를 원하는
              <br />
              상품을 등록하세요
            </h2>
            <p className={styles.featureDescription}>
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.banner} ${styles.bottomBanner}`}>
        <div className={styles.inner}>
          <div className={styles.bottomBannerText}>
            <h2>
              믿을 수 있는
              <br />
              판다마켓 중고거래
            </h2>
          </div>
          <Image
            src="/images/home/Img_home_bottom.svg"
            alt=""
            width={746}
            height={397}
            className={styles.bottomBannerImg}
            aria-hidden="true"
          />
        </div>
      </section>
    </>
  );
}