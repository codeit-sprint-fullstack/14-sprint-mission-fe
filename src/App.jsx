import Header from './Header/Header';
import Footer from './Footer/Footer';
import ProductList from './components/ProductList/ProductList';
import BestProductList from './components/BestProductList/BestProductList';

function App() {

  return (
    <div>
      <Header/>
      <BestProductList/>
      <ProductList/>
      <Footer/>
    </div>
  )
}

export default App;
