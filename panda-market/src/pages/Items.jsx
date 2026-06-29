import { useEffect, useState } from 'react';
import axios from '../utils/axios.js';
import ProductList from '../component/ProductList.jsx';


function Items() {
  const [items, setItems] = useState([]);
  const [orderBy, setOrderBy] = useState('recent');
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const handleLoad = async () => {
    const response = await axios.get('/products', {
      params: {
        page: page,
        pageSize: pageSize,
        orderBy: orderBy,
        keyword: keyword
      }
    });
    console.log(response.data)
    setItems(response.data)
  };
  
  //반응형
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setPageSize(2);
      } else if (window.innerWidth <= 768) {
        setPageSize(6);
      } else {
        setPageSize(10);
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

  return (
    <>
      <section className='product'>
        <ProductList
          items={items}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          page={page}
          setPage={setPage}
          keyword={keyword}
          setKeyword={setKeyword}
        />
      </section>
    </>
  )
}

export default Items;