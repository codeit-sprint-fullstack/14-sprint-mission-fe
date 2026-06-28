import { Route, Routes } from "react-router-dom"
import './App.css';
import Layout from "./Layout"
import MainPage from "./pages/MainPage"
import LoginPage from "./pages/LoginPage";
import ItemPage from "./pages/ItemPage";
import FaqPage from "./pages/FaqPage";
import PrivacyPage from "./pages/PrivacyPage";
import SignupPage from "./pages/SignupPage";


function App() {

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/item" element={<ItemPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
            </Route>
        </Routes>
    )
}

export default App
