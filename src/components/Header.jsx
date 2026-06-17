import logo from '../assets/panda-face.png';

function Header() {
  return (
    <header>
      <div>
        <img src={logo} />
        <p>판다마켓</p>
      </div>
      <div>
        <p>자유게시판</p>
        <p>중고마켓</p>
      </div>
      <button>로그인</button>
    </header>)
}

export default Header;