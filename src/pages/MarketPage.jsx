import Header from "../components/Header";
import BestProductList from "../components/BestProductList";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";




function MarketPage () {
   return( 
   <>
    
    <Header />
    <main>
    <BestProductList />
    <ProductList />
    </main>
    <Footer />

    </>
   );
}

export default MarketPage