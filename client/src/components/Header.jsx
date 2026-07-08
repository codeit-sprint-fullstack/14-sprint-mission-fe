import { Link, NavLink } from 'react-router-dom';
import MainLogo from '../assets/logo_main_2x.png';
import MainlogoM from '../assets/logo_main_m.png';

// function activeLinkColor ({ isActive }) {
//   return {
//     color: isActive ? "#3692FF" : "" 
//   };
// }

function Header({ isPageName }) {

  return (
    <header>
      <nav>
        <div className="left-zone">
          <h1>
            <Link to="/">
              <picture>
               <source srcSet={MainlogoM} media='(max-width: 480px)'/>
               <img src={MainLogo} alt="판다마켓"/>
              </picture>
            </Link>
          </h1>
          <ul style={isPageName === '/'? {display:'none'}:{}}>
            <li><Link to="/">자유게시판</Link></li>
            <li><NavLink to="/items" style={({isActive}) => ({color: isActive ? 'var(--color-text-point)' : '' })}>중고마켓</NavLink></li>
          </ul>
        </div>
        <button type="button" className="bt-primary">로그인</button>
      </nav>
    </header>
  );
}

export default Header;