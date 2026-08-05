import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Items from './pages/Items';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Registration from './pages/Registration';
import ItemDetail from './pages/ItemDetail';
import Board from './pages/Board';
import ArticleDetail from './pages/ArticleDetail';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/:id" element={<ArticleDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;