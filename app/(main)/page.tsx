import Link from 'next/link';
import styles from './page.module.css';


const Main = () => {
  return (
    <>
    <main>
      <section className={styles.moveItem}>
        <Link href="/items" className={styles.MoveItem}>
          구경하러가기
        </Link>
      </section>
      <section className={styles.HotItem}>
          <p>인기상품을 확인해보세요.</p>
        </section>
      <section className={styles.searchItem}>
        <p>구매를 원하는 상품을 검색하세요.</p>
      </section>
      <section className={styles.registerItem}>
        <p>판매를 원하는 상품을 등록하세요.</p>
      </section>
      <section className={styles.register}>
        <p>믿을 수 있는 판다마켓 중고 거래</p>
      </section>
    </main>
    <footer className={styles.footer}>
      codeit-2024
    </footer>
</>

   
  )
}

export default Main;