import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './component/Header.jsx';
import Footer from './component/Footer.jsx';
import Landing from './pages/Landing.jsx';
import Items from './pages/Items.jsx';
import Register from './pages/Register.jsx';
import ItemsDetail from './pages/ItemDetail.jsx';


function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/items" element={<Items />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:id" element={<ItemsDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;