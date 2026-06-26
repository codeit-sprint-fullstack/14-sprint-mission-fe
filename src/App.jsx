import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import MarketPage from "./pages/MarketPage";
import SignupPage from "./pages/SignupPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import ItemDetailPage from "./pages/ItemDetailPage";


function App() {
  return(
  <Routes>
    <Route path="/" element={<LandingPage />}/>
    <Route path="/items" element={<MarketPage />}/>
    <Route path="/login" element={<LoginPage />}/>
    <Route path="/signup" element={<SignupPage />}/>
    <Route path="/registration" element={<RegistrationPage />}/>
    <Route path="/items/:id" element={<ItemDetailPage />} />
  </Routes>
  );
}

export default App