import { useCallback, useEffect, useState } from 'react';
import axios from '../utils/axios';

//베스트 상품 4개만 가져오기
function useBestProducts({ pageSize = 4 }) {
  const [bestProducts, setBestProducts] = useState([]); //받아온 베스트 상품 목록(4개)
  const [isLoading, setIsLoading] = useState(false); //로딩 상태 관리
  const [error, setError] = useState(null); //에러 상태 관리

  const loadBestProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get('/products', {
        params: {
          orderBy: 'favorite', //좋아요 순으로 고정
          page: 1,
          pageSize,
        },
      });

      setBestProducts(response.data.list); //응답받은 데이터 저장
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    loadBestProducts();
  }, [loadBestProducts]);

  return {
    bestProducts,
    isLoading,
    error,
    reload: loadBestProducts,
  };
}

export default useBestProducts;