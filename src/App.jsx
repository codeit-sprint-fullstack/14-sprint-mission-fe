import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/landing/HomePage'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import ItemsPage from './pages/items/ItemsPage'
import FaqPage from './pages/faq/FaqPage'
import PrivacyPage from './pages/privacy/PrivacyPage'
import BoardPage from './pages/board/BoardPage'
import ProductRegistrationPage from './pages/registration/ProductRegistrationPage'
import ProductDetailPage from './pages/items/ProductDetailPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/items" element={<ItemsPage />} />
      <Route path="/boards" element={<BoardPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/registration" element={<ProductRegistrationPage />} />
      <Route path="/items/:id" element={<ProductDetailPage />} />
    </Routes>
  )
}

export default App
