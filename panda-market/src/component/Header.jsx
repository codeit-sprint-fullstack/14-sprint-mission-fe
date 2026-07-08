import '../css/Header.css'
import pandaLogo from '../assets/logo.png'
import pandaLogoM from '../assets/logoM.png'
import { Link, useLocation } from 'react-router-dom'
function Header() {
  const landingPage = useLocation();
  const isLanding = landingPage.pathname === '/';
  return (
    <header>
      <div className="headerCont">
        <div className="headerInner">
          <div className="headerLeft">
            <Link to="/" className="logo">
              <img className='logoPc' src={pandaLogo} alt="판다마켓로고" />
              <img className='logoMo' src={pandaLogoM} alt="판다마켓로고" />
            </Link>
            {!isLanding && (
              <div className="headerMenu">
                <div className="menu freeBoard">
                  <Link>자유게시판</Link>
                </div>
                <div className="menu usedMarket">
                  <Link to="/items">중고마켓</Link>
                </div>
              </div>
            )}
          </div>
          <div className="login">
            <Link>로그인</Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header