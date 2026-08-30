import * as api from '@/api.js';
import { useMutation, useQuery } from '@tanstack/react-query';

// 게시글 생성하기
export function useCreateArticle() {
  return useMutation({
    mutationFn: (data) => api.createArticle(data),
  });
}

// 게시글 목록 가져오기
export function useGetArticles({ page, pageSize, orderBy, keyword }) {
  return useQuery({
    queryKey: ['articles', { page, pageSize, orderBy, keyword }],
    queryFn: () => api.getArticles({ page, pageSize, orderBy, keyword }),
  });
}

// 게시글 가져오기
export function useGetArticle(articleId, isUser) {
  return useQuery({
    queryKey: ['article', articleId],
    queryFn: () => api.getArticle(articleId),
    enabled: Boolean(articleId) && Boolean(isUser),
  });
}

// 게시글 수정하기
export function useUpdateArticle() {
  return useMutation({
    mutationFn: ({ articleId, data }) => api.updateArticle(articleId, data),
  });
}

// 게시글 삭제하기
export function useDeleteArticle() {
  return useMutation({
    mutationFn: (articleId) => api.deleteArticle(articleId),
  });
}

// 게시글 좋아요 생성하기
export function useCreateArticleLike() {
  return useMutation({
    mutationFn: (articleId) => api.createArticleLike(articleId),
  });
}

// 게시글 좋아요 삭제하기
export function useDeleteArticleLike() {
  return useMutation({
    mutationFn: (articleId) => api.deleteArticleLike(articleId),
  });
}
