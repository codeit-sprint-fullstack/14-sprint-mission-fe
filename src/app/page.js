import Image from "next/image";
import LandingFeature from "@/components/LandingFeature/LandingFeature";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              일상의 모든 물건을 <br />
              거래해 보세요
            </h1>

            <Button href="/items" className={styles.heroButton}>
              구경하러 가기
            </Button>
          </div>

          <div className={styles.heroImage}>
            <Image
              src="/images/Img_home_top.png"
              alt="판다 구경"
              width={746}
              height={340}
              priority
            />
          </div>
        </div>
      </section>

      <LandingFeature
        image="/images/Img_home_01.png"
        alt="인기 상품"
        keyword="Hot item"
        title={
          <>
            인기 상품을 <br />
            확인해 보세요
          </>
        }
        description={
          <>
            가장 HOT한 중고거래 물품을
            <br />
            판다 마켓에서 확인해 보세요
          </>
        }
      />

      <LandingFeature
        image="/images/Img_home_02.png"
        alt="상품 검색"
        keyword="Search"
        title={
          <>
            구매를 원하는 <br />
            상품을 검색하세요
          </>
        }
        description={
          <>
            구매하고 싶은 물품은 검색해서
            <br />
            쉽게 찾아보세요
          </>
        }
        reverse
      />

      <LandingFeature
        image="/images/Img_home_03.png"
        alt="상품 등록"
        keyword="Register"
        title={
          <>
            판매를 원하는 <br />
            상품을 등록하세요
          </>
        }
        description={
          <>
            어떤 물건이든 판매하고 싶은 상품을
            <br />
            쉽게 등록하세요
          </>
        }
        last
      />

      <section className={styles.trust}>
        <div className={styles.trustInner}>
          <h2 className={styles.trustTitle}>
            믿을 수 있는 <br />
            판다마켓 중고 거래
          </h2>

          <div className={styles.trustImage}>
            <Image
              src="/images/Img_home_bottom.png"
              alt="판다마켓 중고 거래"
              width={746}
              height={397}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
