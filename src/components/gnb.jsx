import Link from 'next/link';
import { useRouter } from 'next/router';
import style from "./gnb.module.css";

function Gnb( type ) {
  const router = useRouter();

  return (
    <header>
      <div className={style.wrap}>
        <div className={style.logo_navigate_wrap}>
          <div className={style.logo}>
            <Link href="/">
              <img src="/assets/panda_logo.svg" alt="Logo" />
            </Link>
            <Link href="/">
              <h1 className={style.text}>판다마켓</h1>
            </Link>
          </div>


          {router.pathname !== '/' && (
            <div className={style.navigate}>
              <Link href="/notice" className={style.navigate_box}>
                <span className={router.pathname.startsWith('/notice') ? style.active : style.none_active}>
                  자유게시판
                </span>
              </Link>
              <Link href="/mall" className={style.navigate_box}>
                <span className={router.pathname.startsWith('/mall') ? style.active : style.none_active}>
                  중고마켓
                </span>
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          className={style.loginButton}
          onClick={() => router.push('/login')}>
          <span>로그인</span>
        </button>
      </div>
    </header>
  )
}

export default Gnb;