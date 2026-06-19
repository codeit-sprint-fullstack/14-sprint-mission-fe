import logo from '../assets/panda-face.png';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <div className='header-left'>
        <a href='/' className='header-logo'>
          <img className='panda-face' src={logo} alt='판다마켓 로고' />
          <span className='brand-logo'>판다마켓</span>
        </a>
        <nav className='header-menu'>
          <a href='/'>자유게시판</a>
          <a href='/'>중고마켓</a>
        </nav>
      </div>
      <button
        className='login-button'
        onClick={() => {
          window.location.href = '/';
        }}
      >
        로그인
      </button>
    </header>)
}

export default Header;