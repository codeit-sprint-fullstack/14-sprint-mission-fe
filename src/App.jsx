import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import MarketPage from './pages/MarketPage';
import Registration from './pages/RegistrationPage';




function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />} >
          <Route index element={<LandingPage />} />
          <Route path='items' element={<MarketPage />} />
          <Route path='registration' element={<Registration />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
