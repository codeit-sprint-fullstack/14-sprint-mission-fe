import { useEffect, useState } from 'react';
import './App.css';
import axios from './utils/axios.js';
import Header from './component/Header.jsx';
import Footer from './component/Footer.jsx';
import ProductList from './component/ProductList.jsx';
import BestProductList from './component/BestProductList.jsx';

function App() {
  const [items, setItems] = useState([]);
  const handleLoad = async () => {
    const response = await axios.get('/products');
    console.log(response.data)
    setItems(response.data.list)
  };
  const [bestItems, setBestItems] = useState([]);
const handleLoadBest = async () => {
  const response = await axios.get('/products', {
    params: {
      page: 1,
      pageSize: 4,
      orderBy: 'favorite'
    }
  });

  setBestItems(response.data.list);
}

  useEffect(() => {
    handleLoad();
  }, []);
  useEffect(() => {
    handleLoadBest();
  }, []);

  return (
    <>
      <Header />
        <div className="productContents">
          <div className="inner">
            <div className="prodcutBest">
              <p className="sectionTitle">베스트 상품</p>
              <BestProductList items={items} />
            </div>
          </div>
        </div>
      <Footer />
    </>
  );
}

export default App;