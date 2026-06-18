import '../css/Header.css'
import pandaLogo from '../assets/logo.png'
function Header (){
  return (
    <header>
      <div className="headerCont">
        <div className="headerInner">
          <div className="headerLeft">
            <div className="logo">
              <img src={pandaLogo} alt="판다마켓로고" />
            </div>
            <div className="headerMenu">
              <div className="menu freeBoard">
                <a href="/">자유게시판</a>
              </div>
              <div className="menu usedMarket">
                <a href="/">중고마켓</a>
              </div>
            </div>
          </div>
          <div className="login">
            <a href="/">로그인</a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header