import { Link } from "react-router-dom"

function Header() {
    return (
        <header>
            <div className="header-contents">
                <h1 className="header-logo">
                    <Link to="/">
                        <img src="/img/icon/main_logo.svg" alt="" />
                        <img src="/img/icon/main_logo_text.svg" alt="판다마켓" />
                    </Link>
                </h1>
                <Link to="/login">
                    <div className="login-btn">로그인</div>
                </Link>
            </div>
        </header>
    )
}

export default Header