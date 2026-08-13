import * as api from '@/api';
import { useQuery } from '@tanstack/react-query';

// 상품 목록 가져오기
export function useGetProducts({ page, pageSize, orderBy, keyword }) {
  return useQuery({
    queryKey: ['products', { page, pageSize, orderBy, keyword }],
    queryFn: () => api.getProducts({ page, pageSize, orderBy, keyword }),
  });
}

// 상품 가져오기
export function useGetProduct(productId, isUser) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => api.getProduct(productId),
    enabled: !!isUser,
  });
}

// 상품 댓글 목록 가져오기
export function useGetProductComments(productId, limit) {
  return useQuery({
    queryKey: ['comments', productId],
    queryFn: () => api.getProductComments(productId, limit),
  })
}