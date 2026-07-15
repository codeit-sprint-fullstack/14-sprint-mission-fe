import { Route } from "react-router-dom";
import Items_Header from "../components/Items_Header.jsx";
import style from "../style/Items.module.css";
import Items_Content from "../components/Items_Content.jsx";
import Footer from "../components/Footer.jsx";

function Items() {
  return (
    <>
      <Items_Header />
      <Items_Content />
      <Footer />
    </>
  )
}

export default Items;