import './IndexPage.css'

import Header from '../components/Header.jsx'
import HeroSection from '../components/HeroSection.jsx'
import HotItem from '../components/HotItem.jsx'
import SearchSection from '../components/SearchSection.jsx'
import SalesSection from '../components/SalesSection.jsx'
import BottomBanner from '../components/BottomBanner.jsx'
import Footer from '../components/Footer.jsx'

function IndexPage() {
  return (
    <>
      <Header />

      <main>
        <HeroSection />
        <HotItem />
        <SearchSection />
        <SalesSection />
        <BottomBanner />
      </main>

      <Footer />
    </>
  )
}

export default IndexPage