import { useState, useEffect } from "react";
import axios from "axios";
import Products from "../JavaScript/ProductService.js"


function useApi (page, size, option, keyword){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPage, setTotalPage] = useState(0); // 페이지 개수
  const [count, setCount] = useState(0); // 상품 개수

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://panda-market-api.vercel.app/products?page=${page}&pageSize=${size}&orderBy=${option}${keyword ? `&keyword=${keyword}` : ""}`,
          {
            headers: { "Cache-Control": "no-cache" },
          }
        );
        setProducts(res.data.list);
        setCount(res.data.totalCount);
        setTotalPage(Math.ceil(res.data.totalCount / size));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page, size, option, keyword]);
  return {products, count, totalPage, loading, error};
}

export default useApi;