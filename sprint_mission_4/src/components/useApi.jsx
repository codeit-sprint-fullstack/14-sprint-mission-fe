import { useState, useEffect } from "react";
import axios from "axios";
import Products from "../JavaScript/ProductService.js"


function useApi (page, size, option){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://panda-market-api.vercel.app/products?page=${page}&pageSize=${size}&orderBy=${option}`
        );
        setProducts(res.data.list);
        console.log(res.data.list);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page, size, option]);

  return {products, loading, error};
}

export default useApi;