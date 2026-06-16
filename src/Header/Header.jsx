import logo from '../assets/logo/panda_logo.png';
import '../Header/Header.css';

function Header() {
  return (
    <header>
        <div className='headerWrap'>
            <div className='headerLeft'>
                <h1>
                    <a href="/">
                        <img src={logo} alt="판다마켓 로고"/>
                        <span>판다마켓</span>               
                    </a>
                </h1>
                <ul>
                    <li>
                        <a href="/">자유게시판</a>
                    </li>
                    <li>
                        <a href="/">중고마켓</a>
                    </li>
                </ul>
            </div>
            <a href="/">로그인</a>
        </div>
    </header>
  );
}

export default Header;