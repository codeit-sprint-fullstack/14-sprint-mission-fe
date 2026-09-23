"use client";

import {
  createProductComment,
  deleteProductComment,
  getProductComments,
  updateProductComment,
} from "@/lib/productCommentApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const COMMENT_LIMIT = 10;

export default function useProductComments(productId) {
  const {
    data,
    isPending,
    isError,
    error: commentsError,
  } = useQuery({
    queryKey: ["productComments", productId, { limit: COMMENT_LIMIT }],
    queryFn: () =>
      getProductComments({
        productId,
        limit: COMMENT_LIMIT,
      }),
    enabled: Boolean(productId),
  });

  const comments = data?.list ?? [];

  const queryClient = useQueryClient();

  const {
    mutateAsync: createComment,
    isPending: isCreating,
    isError: isCreateError,
    error: createError,
  } = useMutation({
    mutationFn: (content) => createProductComment(productId, content),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["productComments", productId],
      });
    },
  });

  const {
    mutateAsync: updateComment,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
    variables: updatingComment,
  } = useMutation({
    mutationFn: ({ commentId, content }) =>
      updateProductComment(commentId, content),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["productComments", productId],
      });
    },
  });

  const {
    mutateAsync: deleteComment,
    isPending: isDeleting,
    isError: isDeleteError,
    error: deleteError,
    variables: deletingCommentId,
  } = useMutation({
    mutationFn: (commentId) => deleteProductComment(commentId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["productComments", productId],
      });
    },
  });

  const handleCreateComment = async (content) => {
    try {
      await createComment(content);
      return true;
    } catch {
      return false;
    }
  };

  const handleUpdateComment = async (commentId, content) => {
    try {
      await updateComment({
        commentId,
        content,
      });

      return true;
    } catch {
      return false;
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      return true;
    } catch {
      return false;
    }
  };

  return {
    comments,
    isPending,
    isError,
    commentsError,

    handleCreateComment,
    isCreating,
    isCreateError,
    createError,

    handleUpdateComment,
    isUpdating,
    isUpdateError,
    updateError,
    updatingComment,

    handleDeleteComment,
    isDeleting,
    isDeleteError,
    deleteError,
    deletingCommentId,
  };
}
