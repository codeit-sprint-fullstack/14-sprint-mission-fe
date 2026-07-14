import { Link, NavLink } from "react-router-dom"

function Header() {
    return (
        <header>
            <div className="header-contents">
                <div className="header-left">
                    <h1 className="header-logo">
                        <Link to="/">
                            <img src="/img/icon/main_logo.svg" alt="" />
                            <img src="/img/icon/main_logo_text.svg" alt="판다마켓" />
                        </Link>
                    </h1>

                    <nav className="header-nav">
                        <NavLink to="/community" className="nav-link">
                            자유게시판
                        </NavLink>
                        <NavLink
                            to="/items"
                            className="nav-link"
                            style={({ isActive }) => ({ color: isActive ? "#3692FF" : undefined })}
                        >
                            중고마켓
                        </NavLink>
                    </nav>
                </div>
                <Link to="/login">
                    <div className="login-btn">로그인</div>
                </Link>
            </div>
        </header>
    )
}

export default Header