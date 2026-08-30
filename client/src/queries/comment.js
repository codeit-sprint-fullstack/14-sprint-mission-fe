import * as api from '@/api';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

// 상품 댓글 목록 가져오기 (무한 스크롤)
export function useGetProductComments(productId, limit) {
  return useInfiniteQuery({
    queryKey: ['productComments', productId, limit],
    queryFn: ({ pageParam }) => api.getProductComments(productId, limit, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastpage) => lastpage.nextCursor ?? undefined,
  });
}

// 상품 댓글 생성하기
export function useCreateProductComment() {
  return useMutation({
    mutationFn: ({ productId, data}) => api.createProductComment(productId, data)
  });
}

// 게시글 댓글 가져오기 (무한 스크롤)
export function useGetArticleComments(articleId, limit) {
  return useInfiniteQuery({
    queryKey: ['articleComments', articleId, limit],
    queryFn: ({ pageParam }) => api.getArticleComments(articleId, limit, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastpage) => lastpage.nextCursor ?? undefined,
  });
}

// 게시글 댓글 생성하기
export function useCreateArticleComment() {
  return useMutation({
    mutationFn: ({ articleId, data }) => api.createArticleComment(articleId, data),
  });
}

// 댓글 수정하기
export function useUpdateComment() {
  return useMutation({
    mutationFn: ({ commentId, data }) => api.updateComment(commentId, data)
  })
}

// 댓글 삭제하기
export function useDeleteComment() {
  return useMutation({
    mutationFn: (commentId) => api.deleteComment(commentId)
  })
}
