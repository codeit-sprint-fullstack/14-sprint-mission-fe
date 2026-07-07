import { useState, useEffect, useCallback } from 'react';
import axios from '../utils/axios.jsx';
import ItemList from "./ItemList.jsx";


function BestProductsList () {
  const [bestItems, setBestItems] = useState([]);
  const [pageSize, setPageSize] = useState(4);

  const handleLoad = useCallback(async () => {
    const response = await axios.get('/tasks',{
      params: {
        pageSize: pageSize,
        orderBy: 'favorite',
      }
    });
    const { items } = response.data;
    setBestItems(items);
  },[pageSize]);

  const handleSize = useCallback(() => {
     const contentWidth = window.innerWidth;
     console.log(contentWidth);
     if (contentWidth < 480 ){
       setPageSize(1);
       console.log('1');
     } else if (contentWidth < 1024 ){
       setPageSize(2);
       console.log('2');
     } else {
       setPageSize(4);
       console.log('4');
     }
   },[]);
 
   useEffect(() => {
     handleSize();
     window.addEventListener('resize',handleSize);
     return () => window.removeEventListener('resize',handleSize);
   },[handleSize]);
 
  useEffect(() => {
    console.log('핸들로드 실행');
    handleLoad();
  },[handleLoad]);

  return (
    <section className="products-list best">
      <h2 className="section-title">베스트 상품</h2> 
      <ItemList items={bestItems}/>
    </section>
  );
}

 export default BestProductsList;