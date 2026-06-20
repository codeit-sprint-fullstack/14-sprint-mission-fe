import { useEffect, useState } from 'react';
import { getProductList } from '../services/pandaApi.js';

function useProducts({ page, pageSize, keyword = '', orderBy = '' }) {
  const [data, setData] = useState({ list: [], totalCount: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    setIsLoading(true);
    setError('');

    getProductList({ page, pageSize, keyword, orderBy })
      .then((response) => {
        if (ignore) {
          return;
        }

        setData({
          list: Array.isArray(response?.list) ? response.list : [],
          totalCount: Number(response?.totalCount || 0),
        });
      })
      .catch((requestError) => {
        if (ignore) {
          return;
        }

        setData({ list: [], totalCount: 0 });
        setError(requestError.message || '상품 데이터를 불러오지 못했습니다.');
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [page, pageSize, keyword, orderBy]);

  return { ...data, isLoading, error };
}

export default useProducts;
