import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MainLayout() {
  return (
    <div className="layout">
      <Header />

      <main className="layout-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout
