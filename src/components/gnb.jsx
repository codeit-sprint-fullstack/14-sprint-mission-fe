import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import style from "./gnb.module.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Gnb(type) {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const storedNickname = localStorage.getItem('nickname');
    if (token && storedNickname) {
      setNickname(storedNickname);
    }
  }, []);

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
              <Link href="/items" className={style.navigate_box}>
                <span className={router.pathname.startsWith('/items') ? style.active : style.none_active}>
                  중고마켓
                </span>
              </Link>
            </div>
          )}
        </div>

        {nickname ? (
          <div className={style.userBox}>
            <img
              src="/assets/ic_profile.svg"
              alt="User Icon"
              className={style.userIcon}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} // 클릭 시 토글
              style={{ cursor: "pointer" }}
            />
            <span>{nickname}</span>

            {isDropdownOpen && (
              <ul className={style.dropdown}>
                <li
                  onClick={() => {
                    toast.info('마이페이지는 현재 준비중입니다.', {
                      position: "top-right",
                      autoClose: 3000,
                    });
                    // router.push("/mypage");
                  }}
                >
                  마이페이지
                </li>
                <li
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("nickname");
                    router.push("/");
                    router.reload();
                  }}
                >
                  로그아웃
                </li>
              </ul>
            )}
          </div>
        ) : (
          <button
            type="button"
            className={style.loginButton}
            onClick={() => router.push('/login')}
          >
            <span>로그인</span>
          </button>
        )}
      </div>
    </header>
  )
}

export default Gnb;