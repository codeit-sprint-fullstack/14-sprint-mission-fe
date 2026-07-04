import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '../src/components/Layout/Layout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ItemsPage from './pages/ItemsPage.jsx'
import RegistrationPage from './pages/RegistrationPage.jsx'
import ItemDetailPage from './pages/ItemDetailPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path='items' element={<ItemsPage />} />
          <Route path='items/:id' element={<ItemDetailPage />} />
          <Route path='registration' element={<RegistrationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App