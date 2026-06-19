import Footer from '../../components/layout/Footer'
import Header from '../../components/layout/Header'
import FeatureSection from './components/FeatureSection'
import HeroSection from './components/HeroSection'
import TrustSection from './components/TrustSection'
import { featureSections } from './data/featureSections'
import './HomePage.css'

const HomePage = () => {
  return (
    <div>
      <Header />
      <main className="landing-page">
        <HeroSection />
        {featureSections.map((featureSection) => (
          <FeatureSection key={featureSection.badge} {...featureSection} />
        ))}
        <TrustSection />
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
