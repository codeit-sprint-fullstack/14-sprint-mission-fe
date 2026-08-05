import Link from 'next/link';
import styles from '@/styles/notice.module.css';
import Gnb from '../components/gnb.jsx';

export default function Notice() {
  return (
    <>
      <Gnb />
      <main>
        <div className={styles.wrap}>
          <Link href="/">
            <h1>notice</h1>
          </Link>
        </div>
      </main>
    </>
  );
}