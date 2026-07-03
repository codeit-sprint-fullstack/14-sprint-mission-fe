import { Link } from 'react-router-dom'

import heroTopImg from '../assets/img_hero_top.png'
import heroBottomImg from '../assets/img_hero_bottom.png'
import homeImg01 from '../assets/img_home_01.png'
import homeImg02 from '../assets/img_home_02.png'
import homeImg03 from '../assets/img_home_03.png'

import styles from './LandingPage.module.css'

function LandingPage() {
  return (
    <>
      <section className={styles.heroTop}>
        <div className={styles.heroTopContent}>
          <h2 className={styles.heroTopTitle}>
            일상의 모든 물건을 <br />
            거래해 보세요
          </h2>
          <Link to="/items" className={styles.heroTopLink}>구경하러 가기</Link>
        </div>
        <img className={styles.heroTopImg} src={heroTopImg} alt="" />
      </section>
      <section>
        <article className={styles.featureCard}>
          <img className={styles.cardImg} src={homeImg01} alt="" />
          <div>
            <p className={styles.cardLabel}>Hot item</p>
            <h2 className={styles.cardTitle}>
              인기 상품을 <br />
              확인해 보세요
            </h2>
            <p className={styles.cardDesc}>
              가장 HOT한 중고거래 물품을<br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </article>
        <article className={`${styles.featureCard} ${styles.search}`}>
          <div>
            <p className={styles.cardLabel}>search</p>
            <h2 className={styles.cardTitle}>
              구매를 원하는 <br />
              상품을 검색하세요
            </h2>
            <p className={styles.cardDesc}>
              구매하고 싶은 물품을 검색해서<br />
              쉽게 찾아보세요
            </p>
          </div>
          <img className={styles.cardImg} src={homeImg02} alt="" />
        </article>
        <article className={styles.featureCard}>
          <img className={styles.cardImg} src={homeImg03} alt="" />
          <div>
            <p className={styles.cardLabel}>Register</p>
            <h2 className={styles.cardTitle}>
              판매를 원하는 <br />
              상품을 등록하세요
            </h2>
            <p className={styles.cardDesc}>
              어떤 물건이든 판매하고 싶은 상품을<br />
              쉽게 등록하세요
            </p>
          </div>
        </article>
      </section>
      <section className={styles.heroBottom}>
        <h2 className={styles.heroBottomTitle}>
          믿을 수 있는<br />
          판다마켓 중고 거래
        </h2>
        <img className={styles.heroBottomImg} src={heroBottomImg} alt="" />
      </section>
    </>
  )
}

export default LandingPage