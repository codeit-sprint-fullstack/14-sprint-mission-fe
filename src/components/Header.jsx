import pandaFaceImg from '../assets/판다 얼굴.png';
import './Header.css';

function Header() {
  return (
    <header>
      <div className="topic">
        <div className='header-option'>
            <div className="icon">
             <a href="/">
                <p className="panda-image">
              <img src={pandaFaceImg} alt="판다 얼굴" width="27" height="24" />
                </p>
             </a>
             <p className="top-letter">판다마켓</p>
            </div>
            <div className='nav-menu'>
                <button className='nav-link'>자유게시판</button>
                <button className='nav-link'>중고마켓</button>
            </div>
        </div>
        <a className="top-button" href="/login">
          로그인
        </a>
      </div>
    </header>
  );
}

export default Header;