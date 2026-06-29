import { useState, useEffect } from 'react';
import { getProductList } from '../services/ProductService.js';

function useProductList(page, keyword, orderBy) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    getProductList(page, 10, orderBy, keyword)
      .then((data) => { 
        setProducts(data.list); 
        setTotalPages(Math.ceil(data.totalCount / 10));
        setLoading(false);
      })
      .catch((err) => {
  console.error(err);
  setLoading(false);
      });
    }, [page, keyword, orderBy]);

  return { products, loading, totalPages };
      }

export default useProductList;