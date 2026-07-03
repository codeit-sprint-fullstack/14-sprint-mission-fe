import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '../src/components/Layout/Layout.jsx'
import LandingPage from './pages/LandingPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App