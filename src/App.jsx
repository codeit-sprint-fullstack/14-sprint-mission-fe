import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Items from "./pages/Items";
import Privacy from "./pages/Privacy";
import Faq from "./pages/Faq";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Registration from "./pages/Registration";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items" element={<Items />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
}