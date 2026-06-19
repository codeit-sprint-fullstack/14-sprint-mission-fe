import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/landing/HomePage'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import ItemsPage from './pages/items/ItemsPage'
import FaqPage from './pages/faq/FaqPage'
import PrivacyPage from './pages/privacy/PrivacyPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/items" element={<ItemsPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
    </Routes>
  )
}

export default App
