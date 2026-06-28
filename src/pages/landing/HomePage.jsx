import MainLayout from '../../components/layout/MainLayout'
import FeatureSection from './components/FeatureSection'
import HeroSection from './components/HeroSection'
import TrustSection from './components/TrustSection'
import { featureSections } from './data/featureSections'

const HomePage = () => {
  return (
    <MainLayout>
      <HeroSection />
      {featureSections.map((featureSection) => (
        <FeatureSection key={featureSection.badge} {...featureSection} />
      ))}
      <TrustSection />
    </MainLayout>
  )
}

export default HomePage
