import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '../src/components/Layout/Layout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ItemsPage from './pages/ItemsPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path='items' element={<ItemsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App