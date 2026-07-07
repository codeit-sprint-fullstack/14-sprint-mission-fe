import { Routes, Route } from 'react-router-dom'

import Index from './pages/Index.jsx'
import Items from './pages/Items.jsx'
import Registration from './pages/Registration.jsx'
import ItemDetail from './pages/ItemDetail.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Index />}
      />

      <Route
        path="/items"
        element={<Items />}
      />

      <Route
        path="/registration"
        element={<Registration />}
      />

      <Route
        path="/items/:id"
        element={<ItemDetail />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />
    </Routes>
  )
}

export default App