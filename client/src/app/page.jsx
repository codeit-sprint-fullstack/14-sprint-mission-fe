import Link from 'next/link';
import Image from 'next/image';
import heroTopImg from '@/assets/img_hero_top.png';
import homeImg01 from '@/assets/img_home_01.png';
import homeImg02 from '@/assets/img_home_02.png';
import homeImg03 from '@/assets/img_home_03.png';
import heroBottomImg from '@/assets/img_hero_bottom.png';
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.heroTop}>
        <div className={styles.heroTopContent}>
          <p className={styles.heroTopTitle}>
            일상의 모든 물건을<br />
            거래해 보세요
          </p>
          <Link href='/products' className={styles.heroTopLink}>
            구경하러 가기
          </Link>
        </div>
        <Image
          src={heroTopImg}
          width={746}
          height={340}
          loading='eager'
          alt=''
        />
      </section>
      <section className={styles.card}>
        <div className={styles.cardContent}>
          <Image
            src={homeImg01}
            width={588}
            height={444}
            loading='eager'
            alt=''
          />
          <div>
            <p className={styles.cardLabel}>
              Hot item
            </p>
            <p className={styles.cardTitle}>
              인기 상품을<br />
              확인해 보세요
            </p>
            <p className={styles.cardDesc}>
              가장 HOT한 중고거래 물품을<br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>
      </section>
      <section className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.search}>
            <p className={styles.cardLabel}>
              Search
            </p>
            <p className={styles.cardTitle}>
              구매를 원하는 <br />
              상품을 검색하세요
            </p>
            <p className={styles.cardDesc}>
              구매하고 싶은 물품을 검색해서<br />
              쉽게 찾아보세요
            </p>
          </div>
          <Image
            src={homeImg02}
            width={588}
            height={444}
            loading='eager'
            alt=''
          />
        </div>
      </section>
      <section className={styles.card}>
        <div className={styles.cardContent}>
          <Image
            src={homeImg03}
            width={588}
            height={444}
            loading='eager'
            alt=''
          />
          <div>
            <p className={styles.cardLabel}>
              Regitser
            </p>
            <p className={styles.cardTitle}>
              판매를 원하는 <br />
              상품을 등록하세요
            </p>
            <p className={styles.cardDesc}>
              어떤 물건이든 판매하고 싶은 상품을<br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>
      <section className={styles.heroBottom}>
        <p className={styles.heroBottomTitle}>
          믿을 수 있는<br />
          판다마켓 중고 거래
        </p>
        <Image
          src={heroBottomImg}
          width={746}
          height={397}
          loading='eager'
          alt=''
        />
      </section>
    </div>
  );
}
