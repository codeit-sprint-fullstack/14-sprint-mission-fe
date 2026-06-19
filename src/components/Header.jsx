import imgLogo from "../assets/images/logo_panda.png";
import TextLink from "./TextLink";

function Header() {
    return (
        <header id="header">
            <div className="inner_box flex">
                <a className="logo_wrap flex" href="/">
                    <img src={imgLogo} alt="판다마켓 로고이미지" />
                    <h1 className="logo_title">판다마켓</h1>
                </a>

                <TextLink btnStyle="btnBasic" text="로그인"></TextLink>
            </div>
        </header>
    )
}

export default Header;