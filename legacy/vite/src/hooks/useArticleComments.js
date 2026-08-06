import { useCallback, useEffect, useState } from 'react';
import { getArticleComments } from '../services/pandaApi.js';

const PAGE_SIZE = 3;

function useArticleComments(articleId) {
  const [comments, setComments] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadComments = useCallback(async ({ cursor = '', append = false } = {}) => {
    if (!articleId) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await getArticleComments(articleId, { cursor, pageSize: PAGE_SIZE });
      setComments((current) => (append ? [...current, ...(response?.list || [])] : response?.list || []));
      setNextCursor(response?.nextCursor || null);
    } catch (requestError) {
      setError(requestError.message || '댓글을 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const prependComment = (comment) => {
    setComments((current) => [comment, ...current]);
  };

  return {
    comments,
    error,
    isLoading,
    nextCursor,
    loadMore: () => loadComments({ cursor: nextCursor, append: true }),
    prependComment,
    reload: () => loadComments(),
  };
}

export default useArticleComments;
