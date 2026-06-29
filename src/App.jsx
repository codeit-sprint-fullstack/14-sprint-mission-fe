import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import MarketPage from "./pages/MarketPage/MarketPage.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage.jsx";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/items" element={<MarketPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/items/:id" element={<ProductDetailPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;