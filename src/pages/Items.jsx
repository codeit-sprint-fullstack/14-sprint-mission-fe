import BestProducts from "../pages/BestProducts";
import ProductList from "../pages/ProductList";

import { getArticleList } from "../js/ArticleService";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/Items.css";

export default function Items() {
  return (
      <>
      <Header />
      <main className="wrapper item-page">
        <BestProducts />
        <ProductList />
      </main>
    <Footer />
    </>
  );
}
