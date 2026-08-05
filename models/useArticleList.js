import { useState, useEffect } from 'react';
import { getArticleList } from '../services/ArticleService.js';

/**
 * 게시글 목록을 불러오는 훅.
 *
 * @param page 페이지 번호
 * @param keyword 검색 키워드
 * @param pageSize 페이지 당 게시글 수
 */
function useArticleList(page = 1, keyword = '', pageSize = 10) {
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false; // 응답이 늦게 도착한 이전 요청이 최신 결과를 덮어쓰지 않도록 방어

    setLoading(true);
    setError(null);

    getArticleList(page, pageSize, keyword)
      .then((data) => {
        if (ignore) return;
        setArticles(data.list);
        setTotalCount(data.totalCount);
      })
      .catch((err) => {
        if (ignore) return;
        setError(err);
        setArticles([]);
        setTotalCount(0);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [page, keyword, pageSize]);

  const totalPages = Math.max(Math.ceil(totalCount / pageSize), 1);

  return { articles, totalCount, totalPages, loading, error };
}

export default useArticleList;
