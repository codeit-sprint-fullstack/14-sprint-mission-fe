import Link from 'next/link';
import style from './logo.module.css';

function Logo() {
  return (
  <Link href='/' className={style.Logo}>
    <img src="/assets/판다 얼굴.svg" alt="Logo" />
    <h1>판다마켓</h1>
  </Link>
  )
}

export default Logo;