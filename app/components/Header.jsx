import Link from "next/link";
import MainLogo from "@/public/logo_main_2x.png";
import styles from "./Header.module.css";
import Image from "next/image";
import Nav from "./Nav.jsx";
// import MainlogoM from "../assets/logo_main_m.png";

function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.leftZone}>
          <h1>
            <Link href="/">
              <picture>
                <Image src={MainLogo} alt="판다마켓" width={153} height={51} />
              </picture>
            </Link>
          </h1>
          <Nav />
        </div>
        <button type="button" className="btStyle">
          로그인
        </button>
      </nav>
    </header>
  );
}

export default Header;
