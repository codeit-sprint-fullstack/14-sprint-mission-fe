import * as api from '@/api';
import { useMutation } from '@tanstack/react-query';

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
