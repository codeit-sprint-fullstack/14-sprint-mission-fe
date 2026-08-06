import logo from './assets/판다 얼굴.png'
import './Header.css'
import { Link, NavLink } from 'react-router-dom'

function getLinkStyle({ isActive }){
  return {
    color: isActive ? '#3692FF' : '',
  }
}

function Header() {
  return (
    <header className="topbar">
      <div className="logo">
        <img src={logo} alt="로고" />
      </div>
      <div className='panda-letters'>판다마켓</div>
      <div>자유게시판</div>
      <NavLink style={getLinkStyle} to='/items'>중고마켓</NavLink>

      <button className="loginButton">로그인</button>
    </header>
  )
}

export default Header
