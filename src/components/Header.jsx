import logoImg from '../assets/img/logo.png'

function Header() {
    return (
       <header id="header">
            <div className="inner">
                <a href="#" className="logo">
                    <img src={logoImg} alt="판다마켓 로고"/>
                    판다마켓
                </a>
                <nav className="gnb_wrap">
                    <ul id="gnb">
                        <li>
                            <a href="">자유게시판</a>
                        </li>
                        <li>
                            <a href="">중고마켓</a>
                        </li>
                    </ul>
                </nav>
                <a href="" className="login btn">로그인</a>
            </div>
       </header> 
    );
}

export default Header;