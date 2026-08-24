import * as api from '@/api';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

// 상품 댓글 목록 가져오기
export function useGetProductComments(productId, limit) {
  return useInfiniteQuery({
    queryKey: ['comments', productId, limit],
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
