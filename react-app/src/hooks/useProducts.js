import { useCallback, useEffect, useState } from 'react';
import axios from '../utils/axios';

function useProducts({ orderBy, keyword, page, pageSize }) {
  const [products, setProducts] = useState([]); //상품 목록 저장 API에서 받아온 상품 목록이 배열로 들어감
  const [totalCount, setTotalCount] = useState(0); //전체 상품 개수 저장
  const [isLoading, setIsLoading] = useState(false); //로딩 상태 관리 API 요청 중인가 true/false
  const [error, setError] = useState(null); //에러 상태 관리 API 요청 실패 시 에러 정보 null/err

  //상품 목록을 불러오는 함수
  const loadProducts = useCallback(async () => {
    //API 요청 전 에러 초기화 작업
    setIsLoading(true);
    setError(null);
    //API를 요청 시도하기
    // /products에 GET 요청을 보낸다
    try {
      const response = await axios.get('/products', {
        params: {
          orderBy,
          keyword,
          page,
          pageSize,
        },
      });

      //응답 받은 데이터를 저장 products에 list를 저장하고 totalCount를 totalCount에 저장
      setProducts(response.data.list);
      setTotalCount(response.data.totalCount);
      // products.map((product) => (
      //   <ProductCard product={product} />
      // )) 이런 식으로 상품 렌더링 가능
    } catch (err) { //에러 처리
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy, keyword, page, pageSize]); //의존성 배열에 넣기

  useEffect(() => { //loadProducts가 만들어지거나 바뀔 때 실행
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    totalCount,
    isLoading,
    error,
    reload: loadProducts,
  };
}

export default useProducts;