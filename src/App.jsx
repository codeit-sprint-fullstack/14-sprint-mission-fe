import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from 'react'
import Lobby from './pages/Lobby.jsx'
import Header from './components/Lobby_Header.jsx'
import Footer from "./components/Footer.jsx";
import Login from "./pages/Login.jsx";
import Items from "./pages/Items.jsx";
import Signup from "./pages/Signup.jsx";
import Registration from "./pages/Registration.jsx";


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lobby/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/items" element={<Items/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/registration" element={<Registration/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
