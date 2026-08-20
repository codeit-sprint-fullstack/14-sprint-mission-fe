import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import MarketPage from "./pages/MarketPage/MarketPage.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";

function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!isAuthPage && <NavBar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/items" element={<MarketPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/items/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;