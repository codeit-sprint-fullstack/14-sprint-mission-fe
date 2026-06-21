import { useEffect, useState } from 'react';
import './App.css';
import axios from './utils/axios.js';
import Header from './component/Header.jsx';
import Footer from './component/Footer.jsx';
import ProductList from './component/ProductList.jsx';
import BestProductList from './component/BestProductList.jsx';


function App() {
  const [items, setItems] = useState([]);
  const [orderBy, setOrderBy] = useState('recent');
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const handleLoad = async () => {
    const response = await axios.get('/products', {
      params: {
        page: page,
        pageSize:pageSize,
        orderBy: orderBy,
        keyword: keyword
      }
    });
    console.log(response.data)
    setItems(response.data.list)
  };
  //베스트 상품
  const [bestItems, setBestItems] = useState([]);
  const handleLoadBest = async () => {
    const response = await axios.get('/products', {
      params: {
        page: 1,
        pageSize: bestPageSize,
        orderBy: 'favorite'
      }
    });
    setBestItems(response.data.list);
  }
  //반응형
  const [bestPageSize, setBestPageSize] = useState(4);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setPageSize(2);
        setBestPageSize(1);
      } else if (window.innerWidth <= 768) {
        setPageSize(6);
        setBestPageSize(2);
      } else {
        setPageSize(10);
        setBestPageSize(4);
      }
      setPage(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    handleLoad();
  }, [orderBy, page, keyword, pageSize]);
  useEffect(() => {
   handleLoadBest();}, [bestPageSize]);

  return (
    <>
      <Header />
      <BestProductList items={bestItems} />
      <ProductList
        items={items}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        page={page}
        setPage={setPage}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <Footer />
    </>
  );
}

export default App;