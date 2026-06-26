import { Link, NavLink } from 'react-router-dom';
import pandaFaceImg from '../assets/판다 얼굴.png';
import './Header.css';

function Header() {
  return (
    <header>
      <div className="topic">
        <div className='header-option'>
            <div className="icon">
             <Link to="/">
                <p className="panda-image">
              <img src={pandaFaceImg} alt="판다 얼굴" width="27" height="24" />
                </p>
             </Link>
             <p className="top-letter">판다마켓</p>
            </div>
            <div className='nav-menu'>
                <button className='nav-link'>자유게시판</button>
                <NavLink
                to='/items' 
                className={({isActive}) =>
                  isActive ? 'nav-link active' : 'nav-link'
                  }
                  >중고마켓</NavLink>
            </div>
        </div>
        <Link className="top-button" to="/login">
          로그인
        </Link>
      </div>
    </header>
  );
}

export default Header;