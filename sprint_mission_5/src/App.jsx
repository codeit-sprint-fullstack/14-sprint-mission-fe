import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import Lobby from './pages/Lobby.jsx'
import Header from './components/Lobby_Header.jsx'
import Footer from "./components/Footer.jsx";
import Login from "./pages/Login.jsx";
import Items from "./pages/Items.jsx";


function App() {
  const [count, setCount] = useState(0)

  return (
    // 메인 페이지
    // <Router>
    //   <Header />
    //   <Lobby />
    //   <Footer />
    // </Router>

    // 로그인 페이지
    // <Router>
    //   <Login/>
    // </Router>

    // 상품 페이지
    <Router>
      <Items />
    </Router>

  );
}

export default App
