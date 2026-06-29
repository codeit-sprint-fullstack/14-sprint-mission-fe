import './Registration.css'

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

function Registration() {
  return(
<>
      <Header>
        <a href="/" className={`header-menu-link ${currentPath === '/' ? 'nav-active' : 'nav-link'}`}>자유게시판</a>
        <a href="/items" className={`header-menu-link ${currentPath === '/items' ? 'nav-active' : 'nav-link'}`}>중고마켓</a>
      </Header>

</>
  )
}