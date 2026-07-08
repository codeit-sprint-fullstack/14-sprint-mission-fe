import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Items from './pages/Items.jsx';
import Registration from './pages/Registration.jsx';
import Homepage from './pages/Homepage.jsx';
import ItemDetailPage from './pages/ItemDetailPage.jsx';


function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="/items" element={<Items />} />
            <Route path="/items/:id" element={<ItemDetailPage />} />
            <Route path="/registration" element={<Registration />} />
          </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;