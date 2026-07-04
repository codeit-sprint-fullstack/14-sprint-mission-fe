import { Outlet } from 'react-router-dom' 

import Header from './Header.jsx'
import Footer from './Footer.jsx'

import styles from './Layout.module.css'

function Layout() {
  return (
    <>
      <Header />
        <div className={styles.body}>
          <Outlet />
        </div>
      <Footer />
    </>
  )
}

export default Layout