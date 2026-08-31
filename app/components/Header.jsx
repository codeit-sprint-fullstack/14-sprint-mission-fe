import Link from "next/link";
import MainLogo from "@/public/logo_main_2x.png";
import styles from "./Header.module.css";
import Image from "next/image";
import Nav from "./Nav.jsx";
import Login from "./Login";

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
        <Login />
      </nav>
    </header>
  );
}

export default Header;
