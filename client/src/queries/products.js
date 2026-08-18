import * as api from '@/api';
import { useMutation, useQuery } from '@tanstack/react-query';

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

// 상품 수정하기
export function useUpdateProduct() {
  return useMutation({
    mutationFn: ({ productId, data}) => api.updateProduct(productId, data),
  });
}

// 상품 삭제하기
export function useDeleteProduct() {
  return useMutation({
    mutationFn: (productId) => api.deleteProduct(productId),
  });
}

// 상품 좋아요 생성하기
export function useCreateProductFavorite() {
  return useMutation({
    mutationFn: (productId) => api.createProductFavorite(productId),
  });
}

// 상품 좋아요 생성하기
export function useDeleteProductFavorite() {
  return useMutation({
    mutationFn: (productId) => api.deleteProductFavorite(productId),
  });
}

// 상품 댓글 목록 가져오기
export function useGetProductComments(productId, limit) {
  return useQuery({
    queryKey: ['comments', productId, limit],
    queryFn: () => api.getProductComments(productId, limit),
  });
}

// 상품 댓글 생성하기
export function useCreateProductComment() {
  return useMutation({
    mutationFn: ({ productId, data}) => api.createProductComment(productId, data)
  });
}