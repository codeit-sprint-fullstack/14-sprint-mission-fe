import logo from '../assets/panda-face.png';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <div className='header-left'>
        <div className='header-logo'>
          <img className='panda-face' src={logo} />
          <span className='brand-logo'>판다마켓</span>
        </div>
        <div className='header-menu'>
          <span>자유게시판</span>
          <span>중고마켓</span>
        </div>
      </div>
      <button className='login-button'>로그인</button>
    </header>)
}

export default Header;